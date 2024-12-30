import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  standalone: true,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: Date | string | number | undefined): string {
    if (!value) {
      return '';
    }

    const now = new Date().getTime();
    const inputDate = new Date(value).getTime();
    const seconds = Math.floor((now - inputDate) / 1000);

    if (seconds < 60) {
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }

    const days = Math.floor(hours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
}
