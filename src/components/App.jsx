import React, { useState } from 'react';
import Section from '../components/Section/Section';
import FeedbackOptions from '../components/FeedbackOptions/FeedbackOptions';
import Statistics from '../components/Statistics/Statistics';
import Notification from '../components/Notification/Notification';

const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const { good, neutral, bad } = state;

  const onLeaveFeedback = type => {
    setState(prevState => {
      return { ...prevState, [type]: prevState[type] + 1 };
    });
  };

  // statistics
  const countTotalFeedback = () => {
    return Object.values(state).reduce((count, value) => {
      return count + value;
    }, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return Math.round((state.good / total) * 100);
  };
  //-----------------------------------------------------------

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(state)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </>
  );
};

export default App;
