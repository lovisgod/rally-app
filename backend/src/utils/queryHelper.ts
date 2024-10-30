// import { PrismaClient } from '@prisma/client'

import PrismaClientHelper from "../utils/PrismaClientHelper";

// let prisma: PrismaClient

class QueryHelper {
  prisma = PrismaClientHelper.getInstance();
  tableString: string;
  table: any;

  constructor(_table: string) {
    this.tableString = _table;

    switch (this.tableString) {
      case "Workspace":
        this.table = this.prisma.workspace;
        break;
      case "User":
         this.table = this.prisma.rUsers;
          break;
      case "space":
        this.table = this.prisma.space;
        break;    
      case "item":
        this.table = this.prisma.items;
        break;
      case "userSpace":
        this.table = this.prisma.userSpace
        break;  
      case "task"  :
        this.table = this.prisma.task
        break;
      default:
        this.table = this.prisma.rUsers;
        break;
    }
  }

  getTableName() {
    return this.table;
  }

  creator(parameters: any) {
    return this.table.create({ data: parameters });
  }

  createOrFinder(parameters: any, data: any) {
    return this.table.upsert({
      where: parameters,
      update: data,
      create: data,
    });
  }

  bulkCreator(parameters: any) {
    return this.table.createMany({
      data: parameters,
      skipDuplicates: true,
    });
  }

  multipleFinder(parameters: any) {
    return this.table.findMany({ where: parameters });
  }

  findAllRecords() {
    return this.table.findMany();
  }

  getTableCount() {
    return this.table.count();
  }

  singleFinder(parameters: any) {
    return this.table.findFirst({ where: parameters });
  }

  findWithRelations(parameters: any, includes: any) {
    return this.table.findUnique({
      where: parameters,
      include: includes,
    });
  }

  findWithRelationsMultiple(parameters: any, includes: any) {
    return this.table.findMany({
      where: parameters,
      include: includes,
    });
  }

  singleUpdater(parameters: any, data: any) {
    return this.table.update({
      where: parameters,
      data,
    });
  }

  singleDeleter(parameters: any) {
    return this.table.delete({
      where: parameters,
    });
  }

  manyFinder(parameters: any) {
    return this.table.findMany({
      where: parameters,
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
  }

  manyFinderWithPagination(parameters: any, ps: any, pn: any) {
    var toSkip = 0;
    if (pn == 1) {
      toSkip = 0;
    } else {
      toSkip = (+pn - 1) * +ps;
    }
    return this.table.findMany({
      skip: toSkip,
      take: +ps,
      where: parameters,
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
  }
}

export default QueryHelper;
