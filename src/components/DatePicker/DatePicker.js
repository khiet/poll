import React from 'react';

import DayPicker from 'react-day-picker';
import styles from './DatePicker.css';

const defaultClassnames = {
  container: styles['DayPicker'],
  wrapper: styles['DayPicker-wrapper'],
  interactionDisabled: styles['DayPicker--interactionDisabled'],
  months: styles['DayPicker-Months'],
  month: styles['DayPicker-Month'],

  navBar: styles['DayPicker-NavBar'],
  navButtonPrev: styles['DayPicker-NavButton--prev'],
  navButtonNext: styles['DayPicker-NavButton--next'],
  navButtonInteractionDisabled: styles['DayPicker-NavButton--interactionDisabled'],

  caption: styles['DayPicker-Caption'],
  weekdays: styles['DayPicker-Weekdays'],
  weekdaysRow: styles['DayPicker-WeekdaysRow'],
  weekday: styles['DayPicker-Weekday'],
  body: styles['DayPicker-Body'],
  week: styles['DayPicker-Week'],
  weekNumber: styles['DayPicker-WeekNumber'],
  day: styles['DayPicker-Day'],
  footer: styles['DayPicker-Footer'],
  todayButton: styles['DayPicker-TodayButton'],

  // default modifiers
  today: styles['DayPicker-Day--today'],
  selected: styles['DayPicker-Day--selected'],
  disabled: styles['DayPicker-Day--disabled'],
  outside: styles['DayPicker-Day--outside']
};

const datePicker = (props) => {
    return <DayPicker classNames={defaultClassnames} />;
};

export default datePicker;
