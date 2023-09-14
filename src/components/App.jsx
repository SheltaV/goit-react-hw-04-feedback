import { useState } from "react";
import { FeedbackOptions } from "./FeedbackList/FeedbackList";
import { Statistics } from "./Statistics/Statistics";
import { Section } from './Section/Section';
import { Notification } from "./Notification/Notification";

export const App = () => {
  const [state, setState] = useState({good: 0, neutral: 0, bad: 0});

  const { good, neutral, bad } = state;

  const keys = Object.keys(state);
  const values = Object.values(state);

  const clickCount = (key) => {
    setState(prevState => ({
      ...prevState,
      [key]: prevState[key] + 1
  }))
  }
  
  let total = values.reduce(function (sum, elem) {
  return sum + elem
  }, 0)
  
  const getPositive = () => {
    const sum = Math.round((good / total) * 100)
    return sum
  }

  const positive = getPositive()

  return (
      <>
      <Section title='Please leave feedback'>
      <FeedbackOptions options={keys}
          onLeaveFeedback={clickCount} />
      </Section>
      <Section title='Statistics'>
        {total > 0 ? <Statistics good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        positivePercentage={positive} /> : <Notification message="There is no feedback"></Notification>}
      </Section>
      </>
      )

  };
