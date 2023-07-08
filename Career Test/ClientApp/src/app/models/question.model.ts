import { Option } from './option.model';
export interface Question {
  id: number;
  name: string;
  options: Option[];

  hasAnswer: boolean;
}

export class QuestionPagination {
  public options: Option[];
  public name: string;
  public id: number;

  /// pagination fields
  public page: number = 1;
  public totalPages: number;
  public pageSize: number;

  public constructor(question: Question, pageSize: number) {
    this.options = question.options;
    this.name = question.name;
    this.id = question.id;
    this.shafleOptions();

    this.pageSize = pageSize;
    this.totalPages = Number.parseInt(
      ((this.options.length + (pageSize - 1)) / pageSize) as any
    );
  }

  public getPage(change: number = 0) {
    this.page += change;
    return this.options.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  public getNext() {
    return this.getPage(1);
  }

  public getPrevios() {
    return this.getPage(-1);
  }

  public checkNext() {
    if (this.page == this.totalPages) return false;
    else {
      return true;
    }
  }

  public checkPrevios() {
    if (this.page == 1) return false;
    else {
      return true;
    }
  }

  private shafleOptions() {
    let array = this.options;
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
