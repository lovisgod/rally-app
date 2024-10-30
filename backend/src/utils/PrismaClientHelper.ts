import { PrismaClient } from "@prisma/client";

class PrismaClientHelper {

    private static instance : PrismaClient;


    constructor () {

    }


     /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
     public static getInstance(): PrismaClient {
        if (!PrismaClientHelper.instance) {
            PrismaClientHelper.instance = new PrismaClient();
        }

        return PrismaClientHelper.instance;
    }

}

export default PrismaClientHelper;