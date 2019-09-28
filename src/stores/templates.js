export default function (app) {
  return [{
    id: 'gratitude',
    title: 'Daily Gratitude',
    description: 'Increase self-awareness and cultivate happiness.',
    html: `
      <h1>Habits</h1>
      <ul data-checked="false">
        <li>Daily Affirmation</li>
        <li>Smile</li>
        <li>Meditate 10 minutes</li>
        <li>Drink 2 litres of water</li>
      </ul>
      <h1>Reflection</h1>
      <ul>
        <li>How did you feel today?</li>
        <li>What went well? What are you grateful for?</li>
        <li>What did not go well?</li>
        <li>How would you make things better?</li>
      </ul>
    `
  }, {
    id: 'weight',
    title: 'Weight Loss',
    description: 'Track your food intake and make sure you are burning calories!',
    html: `
      <h1>Habits</h1>
      <ul data-checked="false">
        <li>Drink 2 litres of water</li>
        <li>Walk 10000 steps</li>
        <li>30 minutes: Strength Training or Run</li>
        <li>NO SODA</li>
        <li>Eat 3 fruits instead of cookies</li>
      </ul>
      <h2>Why do you want to lose weight?</h2>
      <ul>
        <li>Write daily affirmation...</li>
      </ul>
      <h1>Food Log</h1>
      <ul>
        <li>Breakfast</li>
        <li>Lunch</li>
        <li>Dinner</li>
      </ul>

      <h1>Reflection</h1>
      <ul>
        <li>What went well?</li>
        <li>What did not go well?</li>
      </ul>
    `
  }, {
    id: 'work',
    title: 'Work Journal',
    description: 'Plan your day and track what\'s important!',
    html: `
      <h1>Top 3 Priorities</h1>
      <ul data-checked="false">
        <li>Priority #1</li>
        <li>Priority #2</li>
        <li>Priority #3</li>
      </ul>
      <h2>Later Tasks and Notes</h2>
      <ul>
        <li></li>
      </ul>

      <h1>Reflections</h1>
      <ul>
        <li>What went well today?</li>
        <li>What challenges did you face?</li>
        <li>How would you make today better?</li>
      </ul>
    `
  }, {
    id: 'running',
    title: 'Running',
    description: 'Plan and take steps to complete a 5k or a marathon!',
    html: `
      <h1>Habits</h1>
      <ul data-checked="false">
        <li>Drink at least 2 litres of water</li>
        <li>Warmup before workout with quick core workout</li>
        <li>Stretch after my run</li>
        <li>Recover with protein rich food after workout</li>
      </ul>
      <h2>Workout</h2>
      <ul>
        <li>Mileage: </li>
        <li>Pace: </li>
        <li>Time: </li>
        <li>Route: </li>
      </ul>
      <h1>Reflections</h1>
      <ul>
        <li>What went well today?</li>
        <li>What challenges did you face?</li>
      </ul>
    `
  }, {
    id: 'blank',
    title: 'Blank Template',
    description: 'Make your own template using text, checklist, prompts, etc...',
    html: `
      <ul>
        <li>Start fresh!</li>
      </ul>
    `
  }];
};
