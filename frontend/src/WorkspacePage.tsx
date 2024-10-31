import React, { useState } from "react";
import { canPerformAction } from "./permissions";
import { Transaction, TransactionType, Space } from "./types";

interface WorkspacePageProps {
  user: {
    name: string;
    role: "Admin" | "User";
  };
}

const WorkspacePage: React.FC<WorkspacePageProps> = ({ user }) => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [newSpaceName, setNewSpaceName] = useState("");

  const handleCreateSpace = () => {
    if (!canPerformAction(user.role, "CREATE_SPACE")) {
      console.log("Permission denied: Cannot create spaces.");
      return;
    }

    if (newSpaceName.trim()) {
      const newSpace: Space = {
        id: Date.now().toString(),
        name: newSpaceName,
        transactions: [],
      };
      setSpaces([...spaces, newSpace]);
      setNewSpaceName("");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to the Workspace</h1>
      <h2>
        {user.role}: {user.name}
      </h2>

      {user.role === "Admin" && (
        <div style={styles.infoSection}>
          <h3>Create a New Space</h3>
          <input
            type="text"
            value={newSpaceName}
            onChange={(e) => setNewSpaceName(e.target.value)}
            placeholder="Enter space name"
            style={styles.input}
          />
          <button onClick={handleCreateSpace} style={styles.button}>
            Create Space
          </button>
        </div>
      )}

      <div style={styles.infoSection}>
        <h3>Spaces</h3>
        {spaces.length > 0 ? (
          spaces.map((space) => (
            <SpaceComponent key={space.id} space={space} userRole={user.role} />
          ))
        ) : (
          <p>No spaces created yet</p>
        )}
      </div>
    </div>
  );
};

interface SpaceComponentProps {
  space: Space;
  userRole: "Admin" | "User";
}

const SpaceComponent: React.FC<SpaceComponentProps> = ({ space, userRole }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    space.transactions
  );
  const [transactionType, setTransactionType] =
    useState<TransactionType>("Request");
  const [item, setItem] = useState("");

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (item.trim()) {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: transactionType,
        item,
        createdAt: new Date(),
      };
      setTransactions([...transactions, newTransaction]);
      setItem("");
    }
  };

  return (
    <div style={styles.spaceContainer}>
      <h4>Space: {space.name}</h4>

      {userRole === "User" && (
        <form onSubmit={handleCreateTransaction} style={styles.form}>
          <label>
            Transaction Type:
            <select
              value={transactionType}
              onChange={(e) =>
                setTransactionType(e.target.value as TransactionType)
              }
              style={styles.input}
            >
              <option value="Request">Request</option>
              <option value="Transfer">Transfer</option>
            </select>
          </label>

          <label>
            Item:
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Enter item name"
              style={styles.input}
            />
          </label>

          <button type="submit" style={styles.button}>
            Create Transaction
          </button>
        </form>
      )}

      <h5>Transactions</h5>
      <ul style={styles.transactionList}>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li key={transaction.id}>
              [{transaction.type}] {transaction.item} -{" "}
              {transaction.createdAt.toLocaleString()}
            </li>
          ))
        ) : (
          <li>No transactions yet</li>
        )}
      </ul>
    </div>
  );
};

// Styling remains the same with additional styles for spaces
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    textAlign: "center",
  },
  infoSection: {
    marginTop: "20px",
    textAlign: "left",
    width: "100%",
    maxWidth: "500px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "1px solid #ffa500",
    backgroundColor: "#ffa500",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
  spaceContainer: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "5px",
    width: "100%",
    maxWidth: "500px",
  },
  transactionList: {
    listStyleType: "none",
    padding: 0,
    marginTop: "10px",
  },
};

export default WorkspacePage;
