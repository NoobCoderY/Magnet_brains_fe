import React from 'react';
const priorityColors: Record<string, string> = {
  low: '#38BDF8',
  medium: '#f8b500',
  high: '#ff0000',
};

const PriorityChart = () => {
  return (
    <div className='mb-4 flex justify-center items-center'>
      <div className='flex gap-2 items-center'>
        {['low', 'medium', 'high'].map((priority) => (
          <div
            key={priority}
            className='flex gap-2 items-center'
          >
            <div
              className={`w-[1rem] h-[1rem] rounded-full`}
              style={{ backgroundColor: priorityColors[priority] }}
            ></div>
            <h4>{priority.charAt(0).toUpperCase() + priority.slice(1)}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriorityChart;
