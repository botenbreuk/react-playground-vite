import moment, { Moment } from 'moment';

type Props = {
  date?: string | Moment;
};

export default function CardTimeRemainder(props: Props) {
  const { date } = props;

  function getDurationTillNow() {
    // get the difference between the currentDateTime and the supplied date.
    const duration = moment.duration(moment().diff(moment(date)));
    // return the difference in hours and round down to whole hours.
    return Math.floor(duration.asHours());
  }

  function getLabelBefore(hours: number) {
    if (hours < 0) {
      return 'over';
    }
    return undefined;
  }

  function determineHoursOrDays(hours: number) {
    if (hours <= -24) {
      return (hours * -1) / 24;
    } else if (hours >= 24) {
      return hours / 24;
    } else if (hours <= -1) {
      return hours * -1;
    } else {
      return hours;
    }
  }

  function getLabelAfter(hours: number) {
    if (hours <= 23 && hours >= -23) {
      return 'uur';
    } else if ((hours >= 24 && hours <= 36) || (hours <= -24 && hours >= -36)) {
      return 'dag';
    } else {
      return 'dagen';
    }
  }

  const hours = getDurationTillNow();
  const labelBefore = getLabelBefore(hours);

  if (!date) {
    return null;
  }

  return (
    <span className="duration">
      {labelBefore ? <span className="over">{labelBefore}</span> : ''}
      <span className={`${labelBefore ? 'time-over' : 'time'}`}>
        {Math.floor(determineHoursOrDays(hours))}
      </span>
      <span className="time-type">{getLabelAfter(hours)}</span>
    </span>
  );
}
