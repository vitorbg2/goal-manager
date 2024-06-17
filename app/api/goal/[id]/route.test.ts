import GoalRequestContract from '@/app/api/dto/goal_request_contract'
import { PATCH } from './route';
import * as GoalService from '@/lib/services/goal_service';

jest.mock('@/lib/services/goal_service', () => ({
    UpdateGoal: jest.fn()
}));

it('should return updated data with status 200', async () => {
    // Arrange
    const requestedGoal = {
        title: 'teste',
        description: 'testing',
        dueDate: new Date().toISOString(),
        tasks: []
    }
    const requestObj = {
        json: async () => (requestedGoal),
    } as any;
    const params = {
        params: {
            id: '123'
        }
    }
    const expectedContract = new GoalRequestContract(
        requestedGoal.title,
        requestedGoal.description,
        requestedGoal.dueDate,
        requestedGoal.tasks,
        params.params.id
    );
    jest.spyOn(GoalService, 'UpdateGoal').mockResolvedValue({
        ...requestedGoal,
        id: params.params.id
    });

    // Act
    const response = await PATCH(requestObj, params);
    const body = await response.json();

    // Assert
    expect(GoalService.UpdateGoal).toHaveBeenCalledWith(expectedContract);
    expect(response.status).toBe(200);
    expect(body.goal).toEqual({
        ...requestedGoal,
        id: params.params.id
    });
    expect(GoalService.UpdateGoal).toHaveBeenCalledTimes(1);
});

it('should return 500 when occur an unexpected error', async () => {
    // Arrange
    const requestedGoal = {
        title: 'teste',
        description: 'testing',
        dueDate: new Date().toISOString(),
        tasks: []
    }
    const requestObj = {
        json: async () => (requestedGoal),
    } as any;
    const params = {
        params: {
            id: '123'
        }
    }
    const expectedContract = new GoalRequestContract(
        requestedGoal.title,
        requestedGoal.description,
        requestedGoal.dueDate,
        requestedGoal.tasks,
        params.params.id
    );
    jest.spyOn(GoalService, 'UpdateGoal').mockRejectedValue(new Error('Error fatal'));

    // Act
    const response = await PATCH(requestObj, params);
    const body = await response.json();

    // Assert
    expect(GoalService.UpdateGoal).toHaveBeenCalledWith(expectedContract);
    expect(GoalService.UpdateGoal).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(500);
    expect(body.message).toBe('Falha no servidor');
});