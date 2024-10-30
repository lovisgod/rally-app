import express, { Request, Response, Router } from 'express';
import ApiRepo from '../controllers/appRepo';


const router: Router = express.Router();
const repo = new ApiRepo();

// Define route handlers with TypeScript type annotations
router.post('/add-user-workspace', (req: Request, res: Response) => {
    repo.adduserToWorkspace(req, res)
});

router.post('/register-admin', (req: Request, res: Response) => {
    repo.register(req, res)
});

router.post('/create-workspace', (req: Request, res: Response) => {
    repo.createWorkSpace(req, res)
});

router.get('/get-a-workspace', (req: Request, res: Response) => {
    repo.fetchAWorkSpace(req, res)
})

router.get('/get-a-user', (req: Request, res: Response) => {
    repo.fetchAUser(req, res)
})

router.post('/login-a-user', (req: Request, res: Response) => {
    repo.loginAUser(req, res)
})


router.post('/create-space', (req: Request, res: Response) => {
    repo.createSpace(req, res)
});

router.get('/get-all-worspace-space', (req: Request, res: Response) => {
    repo.fetchAllWorkspaceSpace(req, res)
})

router.put('/edit-space', (req: Request, res: Response) => {
    repo.editSpace(req, res)
});

router.get('/get-a-space', (req: Request, res: Response) => {
    repo.fetchASpace(req, res)
});

router.put('/add-user-space', (req: Request, res: Response) => {
    repo.adduserToSpace(req, res)
});

router.post('/create-item', (req: Request, res: Response) => {
    repo.createItem(req, res)
});

router.put('/edit-item', (req: Request, res: Response) => {
    repo.editItem(req, res)
});



export default router;
