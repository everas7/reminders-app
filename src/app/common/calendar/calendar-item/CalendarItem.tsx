import React, { MouseEvent } from 'react';
import './CalendarItem.css';
import { Col } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { Reminder } from '../../../models/reminder';

interface Props {
  inverted?: boolean;
  disabled?: boolean;
  onClick: (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  onClickReminder: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    reminder: Reminder
  ) => void;
  onRemoveAll: (reminders: Reminder[]) => void;
  onRemove: (reminder: Reminder) => void;
  reminders?: Reminder[];
  className?: string;
}

export const CalendarItem: React.FC<Props> = ({
  inverted,
  children,
  disabled = false,
  onClick,
  onClickReminder,
  onRemoveAll,
  onRemove,
  reminders = [],
  className,
}) => {
  return (
    <Col
      onClick={onClick}
      className={`calendar-item ${inverted ? 'calendar-item--inverted' : ''} ${
        disabled ? 'calendar-item--disabled' : ''
      } ${className}`}
    >
      <div className="calendar-item__header">
        <div>{children}</div>
        {reminders.length ? (
          <X
            onClick={(e) => {
              e.stopPropagation();
              onRemoveAll(reminders);
            }}
            className="calendar-item__x-icon"
            size={25}
          />
        ) : null}
      </div>
      <div className="calendar-item__content">
        {reminders
          .sort(
            (a, b) =>
              new Date().setHours(
                +a.time.split(':')[0],
                +a.time.split(':')[1]
              ) -
              new Date().setHours(+b.time.split(':')[0], +b.time.split(':')[1])
          )
          .map((reminder, i) => (
            <div
              key={reminder.date.toDateString() + i}
              className="calendar-item__reminder"
              onClick={(e) => onClickReminder(e, reminder)}
              style={{
                borderColor: reminder.color || '#FF6900',
                backgroundColor:
                  (reminder.color || 'rgb(255, 105, 0)').slice(0, -1) +
                  ', 0.3)',
              }}
            >
              <div
                style={{
                  color: reminder.color || '#FF6900',
                  fontWeight: 'bold',
                }}
                className="calendar-item__reminder-content"
              >
                {reminder.description || 'New reminder'}
                {reminder.city && (
                  <X
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(reminder);
                    }}
                    className="calendar-item__reminder-x-icon"
                    size={25}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </Col>
  );
};
