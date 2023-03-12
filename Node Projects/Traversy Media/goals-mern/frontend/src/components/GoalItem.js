import { useDispatch } from 'react-redux';
import { deleteGoals } from '../features/goals/goalsSlice';

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  return (
    <div className='goal'>
      <h2>{goal.text}</h2>
      <button
        onClick={() => dispatch(deleteGoals(goal?._id))}
        className='close'
      >
        X
      </button>
    </div>
  );
}

export default GoalItem;
