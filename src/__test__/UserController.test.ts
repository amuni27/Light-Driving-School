import request from 'supertest';
import express from 'express';
import { UserController } from '../controller/UserController';
import { UserServiceImpl } from '../services/impl/UserServiceImpl';

jest.mock('../services/impl/UserServiceImpl');

const app = express();
app.use(express.json());

const userController = new UserController();
app.post('/user', userController.addUser);
app.put('/user/:id', userController.updateUser);
app.get('/user/:id', userController.getUsers);
app.delete('/user/:id', userController.deleteUser);
app.get('/users', userController.getAllUsers);
app.post('/login', userController.login);

describe('UserController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add a user successfully', async () => {
        (UserServiceImpl.prototype.addUser as jest.Mock).mockResolvedValue({
            id: '1',
            username: 'testuser',
            email: 'test@example.com',
            phoneNumber: '1234567890',
            role: 'STUDENT',
            firstName: 'Test',
            lastName: 'User',
            token: 'token'
        });

        const response = await request(app)
            .post('/user')
            .send({
                username: 'testuser',
                password: 'password',
                email: 'test@example.com',
                phoneNumber: '1234567890',
                role: 'STUDENT',
                firstName: 'Test',
                lastName: 'User'
            });

        expect(response.status).toBe(201);
        expect(response.body.username).toBe('testuser');
    });

    it('should return error if add user fails', async () => {
        (UserServiceImpl.prototype.addUser as jest.Mock).mockRejectedValue(new Error('Error adding user'));

        const response = await request(app)
            .post('/user')
            .send({
                username: 'testuser',
                password: 'password',
                email: 'test@example.com',
                phoneNumber: '1234567890',
                role: 'STUDENT',
                firstName: 'Test',
                lastName: 'User'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error adding user');
    });

    it('should update a user successfully', async () => {
        (UserServiceImpl.prototype.updateUser as jest.Mock).mockResolvedValue(true);

        const response = await request(app)
            .put('/user/1')
            .send({
                username: 'updateduser',
                email: 'updated@example.com'
            });

        expect(response.status).toBe(201);
        expect(response.body.response).toBe('Successfully Updated');
    });

    it('should return error if update user fails', async () => {
        (UserServiceImpl.prototype.updateUser as jest.Mock).mockRejectedValue(new Error('Error updating user'));

        const response = await request(app)
            .put('/user/1')
            .send({
                username: 'updateduser',
                email: 'updated@example.com'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error updating user');
    });

    it('should get a user successfully', async () => {
        (UserServiceImpl.prototype.findUser as jest.Mock).mockResolvedValue({
            id: '1',
            username: 'testuser',
            email: 'test@example.com',
            phoneNumber: '1234567890',
            role: 'STUDENT',
            firstName: 'Test',
            lastName: 'User'
        });

        const response = await request(app).get('/user/1');

        expect(response.status).toBe(200);
        expect(response.body.username).toBe('testuser');
    });

    it('should return error if get user fails', async () => {
        (UserServiceImpl.prototype.findUser as jest.Mock).mockRejectedValue(new Error('User not found'));

        const response = await request(app).get('/user/1');

        expect(response.status).toBe(400);
        expect(response.body).toBe('User not found');
    });

    it('should delete a user successfully', async () => {
        (UserServiceImpl.prototype.deleteUser as jest.Mock).mockResolvedValue(true);

        const response = await request(app).delete('/user/1');

        expect(response.status).toBe(204);
    });

    it('should return error if delete user fails', async () => {
        (UserServiceImpl.prototype.deleteUser as jest.Mock).mockRejectedValue(new Error('Error deleting user'));

        const response = await request(app).delete('/user/1');

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error deleting user');
    });

    it('should get all users successfully', async () => {
        (UserServiceImpl.prototype.findAllUser as jest.Mock).mockResolvedValue([
            {
                id: '1',
                username: 'testuser1',
                email: 'test1@example.com',
                phoneNumber: '1234567890',
                role: 'STUDENT',
                firstName: 'Test1',
                lastName: 'User1'
            },
            {
                id: '2',
                username: 'testuser2',
                email: 'test2@example.com',
                phoneNumber: '1234567891',
                role: 'STUDENT',
                firstName: 'Test2',
                lastName: 'User2'
            }
        ]);

        const response = await request(app).get('/users');

        expect(response.status).toBe(201);
        expect(response.body.length).toBe(2);
    });

    it('should return error if get all users fails', async () => {
        (UserServiceImpl.prototype.findAllUser as jest.Mock).mockRejectedValue(new Error('Error fetching users'));

        const response = await request(app).get('/users');

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error fetching users');
    });

    it('should login a user successfully', async () => {
        (UserServiceImpl.prototype.login as jest.Mock).mockResolvedValue({
            id: '1',
            username: 'testuser',
            email: 'test@example.com',
            phoneNumber: '1234567890',
            role: 'STUDENT',
            firstName: 'Test',
            lastName: 'User',
            token: 'token'
        });

        const response = await request(app)
            .post('/login')
            .send({
                username: 'testuser',
                password: 'password'
            });

        expect(response.status).toBe(201);
        expect(response.body.username).toBe('testuser');
    });

    it('should return error if login fails', async () => {
        (UserServiceImpl.prototype.login as jest.Mock).mockRejectedValue(new Error('Invalid username or password'));

        const response = await request(app)
            .post('/login')
            .send({
                username: 'testuser',
                password: 'password'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid username or password');
    });
});
