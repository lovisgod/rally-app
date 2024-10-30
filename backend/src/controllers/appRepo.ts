import { Request, Response } from 'express';
import QueryHelper from '../utils/queryHelper';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponses';
import generateRandomPassword from '../utils/PasswordGenerator';

class ApiRepo {
    async register(req: Request, res: Response) {
        const {name, email, password } = req.body
        try {
        const userData = await new QueryHelper("User").singleFinder({ email })
        console.log(userData)

        if (userData) return sendErrorResponse(res, 409, "User already exist")
        const newUser = await new QueryHelper("User").creator({
            name: name,
            role: "Admin",
            email: email,
            password: password
        })
        if (!newUser) return sendErrorResponse(res, 400, "Error, could not create user")
        const workSpace = await this.createWorkSpaceUtil({userID: newUser.userID, name})
        return  sendSuccessResponse(res, 200, {message:  "User created", workSpace})
        } catch (error) {
            console.log(error)
            return sendErrorResponse(res, 500, "Error, could not create user")
        }     
  }  

  async fetchAUser(req: Request, res: Response) {
    const { userID } = req.query
    try {
         // Associate the user with existing spaces
     const userData = await new QueryHelper("User").findWithRelations({ userID }, {userSpaces: { include: { space: true } } }) // include items
     if (!userData) return sendErrorResponse(res, 404, "User not found")
     return  sendSuccessResponse(res, 200, {message: "User fetched", userData})
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not get user")
    } 
    
  }

  async loginAUser(req: Request, res: Response) {
    const { email, password } = req.body
    try {
         // Associate the user with existing spaces
     const userData = await new QueryHelper("User").singleFinder({ email, password }) // include items
     if (!userData) return sendErrorResponse(res, 404, "User not found")
     delete userData.password
     return  sendSuccessResponse(res, 200, {message: "login successful", userData})
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not get user")
    } 
    
  }
  async fetchAWorkSpace(req: Request, res: Response) {
    const { workspaceID, userID } = req.query
    console.log(workspaceID);
    try {
         // Associate the user with existing spaces
     const workspaceData = await  new QueryHelper("Workspace").findWithRelations({ workspaceID, userID}, {spaces: true}) // include items
     if (!workspaceData) return sendErrorResponse(res, 404, "Workspace not found")
     return  sendSuccessResponse(res, 200, {message: "Workspace fetched", workspaceData})
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not get space")
    } 
    
  }

  async adduserToWorkspace(req: Request, res: Response) {
    const { name, workSpaceId, spaceIds, email, role} = req.body
    try {
    const generatePassword = generateRandomPassword(10)    
    const newUser = await new QueryHelper("User").creator({
                name: name,
                role: role,
                workspaceID: workSpaceId,
                email: email,
                password: generatePassword
        })

        if (!newUser) return sendErrorResponse(res, 400, "Error, could not add use to workspace")
         // Associate the user with existing spaces
     const userSpaceRelations = spaceIds.map(spaceID => ({
        userID: newUser.userID,
        spaceID: spaceID,
      }));
  
     const userSpaceCreated= await new QueryHelper("userSpace").bulkCreator(userSpaceRelations);

      if (!userSpaceCreated) return sendErrorResponse(res, 400, "Error, could not add user to workspace")
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not create a user")
    } 

    return  sendSuccessResponse(res, 200, "User added to workspace")
    
  }




  async createWorkSpace(req: Request, res: Response) {
    const { userID} = req.body
    try {
    const userData = new QueryHelper("User").singleFinder({ userID })

    if (!userData) return sendErrorResponse(res, 404, "User not found")
    const newWorkSpace = await new QueryHelper("Workspace").createOrFinder({userID}, {userID})
    if (!newWorkSpace) return sendErrorResponse(res, 400, "Error, could not create workspace")
         // Associate the user with existing spaces
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not create a workspace") 
    } 
    // Your logic here
    return sendSuccessResponse(res, 200, "Worspace created successfully")
  }

  async createSpace(req: Request, res: Response) {
    const { userID, workspaceID, name, requestFrom, transferTo } = req.body
    try {
    const userData = await new QueryHelper("User").singleFinder({ userID })

    if (!userData) return sendErrorResponse(res, 404, "User not found")
    if (userData.role != "Admin") return sendErrorResponse(res, 403, "User not permitted for this operation")
    const newSpace = await new QueryHelper("space").creator({userID, name, workspaceID, requestFrom, transferTo})
    if (!newSpace) return sendErrorResponse(res, 400, "Error, could not create Space")
         // Associate the user with existing spaces
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not create a space") 
    } 
    // Your logic here
    return sendSuccessResponse(res, 200, "Space created successfully")
  }

  async editSpace(req: Request, res: Response) {
    const { userID, name, requestFrom, transferTo, spaceID } = req.body
    try {
    const userData = await new QueryHelper("User").singleFinder({ userID })

    if (!userData) return sendErrorResponse(res, 404, "User not found")
    if (userData.role != "Admin") return sendErrorResponse(res, 403, "User not permitted for this operation")
    const newSpace = await new QueryHelper("space").singleUpdater({spaceID}, {name, requestFrom, transferTo})
    if (!newSpace) return sendErrorResponse(res, 400, "Error, could not updating Space")
         // Associate the user with existing spaces
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not updating space") 
    } 
    // Your logic here
    return sendSuccessResponse(res, 200, "Space updated successfully")
  }

  async adduserToSpace(req: Request, res: Response) {
    const { spaceID, userID} = req.body
    try {
         // Associate the user with existing spaces
     const userData = new QueryHelper("User").singleFinder({ userID })

     if (!userData) return sendErrorResponse(res, 404, "User not found")
     
     const userSpaceCreated= await new QueryHelper("userSpace").createOrFinder({userID}, {userID, spaceID});

      if (userSpaceCreated) return sendErrorResponse(res, 400, "Error, could not add user to space")
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not add user to space")
    } 

    return  sendSuccessResponse(res, 200, "User added to space")
    
  }

  async createItem(req: Request, res: Response) {
    const { spaceID, name, quantity, uom, sharedWith } = req.body
    try {
         // Associate the user with existing spaces
     const spaceData = await new QueryHelper("space").singleFinder({ spaceID })

     if (!spaceData) return sendErrorResponse(res, 404, "Space not found")
     
     const newItemCreated= await new QueryHelper("item").creator({spaceID, name, quantity, uom, status: "Active", sharedWith: sharedWith });

      if (!newItemCreated) return sendErrorResponse(res, 400, "Error, could not create item")
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not create item")
    } 

    return  sendSuccessResponse(res, 200, "Item created")
    
  }

  async editItem(req: Request, res: Response) {
    const { spaceID, name, quantity, uom, sharedWith, itemID } = req.body
    try {
         // Associate the user with existing spaces
     const spaceData = new QueryHelper("space").singleFinder({ spaceID })

     if (!spaceData) return sendErrorResponse(res, 404, "Space not found")

     const existingItem = await new QueryHelper("item").singleFinder({itemID})
     if (!existingItem) return sendErrorResponse(res, 404, "item not found")     
     const itemUpdated= await new QueryHelper("item").singleUpdater({ itemID },{spaceID, name, quantity, uom, status: "Active", sharedWith: sharedWith });
      if (!itemUpdated) return sendErrorResponse(res, 400, "Error, could not update item")
      return  sendSuccessResponse(res, 200, "Item updated")
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not create item")
    } 
    
  }
  async fetchASpace(req: Request, res: Response) {
    const { spaceID } = req.query
    try {
         // Associate the user with existing spaces    
     const spaceData = await new QueryHelper("space").findWithRelations({ spaceID }, {
        items: true,
         tasksAsRequesting: true,
         tasksAsTransferring: true
        }) // include items
     if (!spaceData) return sendErrorResponse(res, 404, "Space not found")
     return  sendSuccessResponse(res, 200, {message: "Space fetched", spaceData})
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not get space")
    } 
    
  }

  async fetchAllWorkspaceSpace(req: Request, res: Response) {
    const { workspaceID } = req.query
    try {
         // Associate the user with existing spaces
     const spaceData = await new QueryHelper("space").findWithRelationsMultiple({ workspaceID }, {
        items: true,
        tasksAsRequesting: true,
        tasksAsTransferring: true
    }) // include items
     if (!spaceData) return sendErrorResponse(res, 404, "Space not found")
     return  sendSuccessResponse(res, 200, {message: "Spaces fetched", spaces: spaceData})
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not get space")
    } 
    
  }

  async createWorkSpaceUtil(data: any) {
    const { userID, name} = data
    try {
    const userData =await  new QueryHelper("User").singleFinder({ userID })

    if (!userData) return { status: false, message: "could not create workspace"}
    const newWorkSpace = await new QueryHelper("Workspace").creator({userID, name})
    if (!newWorkSpace) return { status: false, message: "Error, could not create workspace"}

    return { status: true, data: { ...userData, ...newWorkSpace}}
         // Associate the user with existing spaces
    } catch (error) {
        console.log(error)
        return { status: false, message: "Error, could not create workspace"}
    } 
  }

  async createTask(req: Request, res: Response) {
    const { itemID, name, requestingSpaceID, transferringSpaceID, quantity } = req.body
    try {
    const itemData = await new QueryHelper("item").singleFinder({ itemID })

    if (!itemData) return sendErrorResponse(res, 404, "item not valid")
    const newTask = await new QueryHelper("task").creator({itemID, name, requestingSpaceID, transferringSpaceID, quantity, status: "Pending"})
    if (!newTask) return sendErrorResponse(res, 400, "Error, could not create task")
         // Associate the user with existing spaces
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not create a task") 
    } 
    // Your logic here
    return sendSuccessResponse(res, 200, "Task created successfully")
  }

  async editTask(req: Request, res: Response) {
    const {itemID, name, requestingSpaceID, transferringSpaceID, quantity, status, taskID } = req.body
    try {
    const taskData = await new QueryHelper("task").singleFinder({ taskID })

    if (!taskData) return sendErrorResponse(res, 404, "Task not found")
    if (taskData.status == "Fulfilled") return sendErrorResponse(res, 409, "Task fulfilled already")
    const editedTask = await new QueryHelper("task").singleUpdater({taskID}, {itemID, name, requestingSpaceID, transferringSpaceID, quantity, status})
    if (!editedTask) return sendErrorResponse(res, 400, "Error, could not updating task")
         // Associate the user with existing spaces
    } catch (error) {
        console.log(error)
        return sendErrorResponse(res, 500, "Error, could not updating task") 
    } 
    // Your logic here
    return sendSuccessResponse(res, 200, "Task updated successfully")
  }
}

export default ApiRepo;
