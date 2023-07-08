import { Question, QuestionPagination } from './question.model';
import { Option } from './option.model';

interface GroupResult {
  count: number;
  additionalCount: number;
  options: Option[];
  result: Result;
}

interface Result {
  id: number;
  name: string;
  linkToImage: string;
  guildName: string;
  power: string;
  subject: string;
  minion: string;
  chairs: Chair[];
  description: string;
}

export interface Chair {
  id: number;
  name: string;
  description: string;
  link: string;
  abbreviation: string;
}

export class TestResult {
  public results: GroupResult[] = [];

  public mainResults: GroupResult[] = [];

  public valid = true;
  public secondValid = false;

  constructor(data: QuestionPagination, results: Result[]) {
    let selectedOptions = data.options.filter((x) => x.value);

    for (let i of results) {
      let selectedResults = selectedOptions.filter((x) => x.resultId === i.id);

      if (selectedResults.length > 0) {
        this.results.push({
          count: selectedResults.map((x) => x.value).reduce((x, y) => x + y),
          options: selectedResults,
          result: i,
          additionalCount: 0
        });
      }
    }

    for (let i of this.results) {
      const subres = TestResult.weights.find(w => w.id === i.result.id);

      i.additionalCount = selectedOptions.map(x => x.value * subres!.linkedWeights.find(w => w.id == x.resultId)!.weight * 0.2).reduce((x, y) => x + y);
    }

    this.results.sort((a, b) => b.count + b.additionalCount - a.count - a.additionalCount);

    this.checkValid();
  }

  private checkValid() {
    this.mainResults.push(...this.results.slice(0, 3));
    this.secondValid = false;
    return;

    if (
      this.mainResults[0].count >= 4 ||
      this.mainResults[0].count - 2 >= this.mainResults[1].count
    ) {
      this.valid = true;
    } else {
      this.valid = false;
    }
    if (this.mainResults.length > 1 && this.mainResults[1].count >= 3) {
      this.secondValid = true;
    }
  }
  // 2	Оракулы
  // 3	Техномаги
  // 4	Техножрецы
  // 5	Хранитель души и тела
  // 6	Хранители цивилизации
  // 7	Хранители мира
  // 8	Повелитель материи

  protected static weights = [
    {
      id: 2,
      linkedWeights: [
        { id: 2, weight: 0 },
        { id: 3, weight: 0.071428571 },
        { id: 4, weight: 0.071428571 },
        { id: 5, weight: 0.214285714 },
        { id: 6, weight: 0.142857143 },
        { id: 7, weight: 0.142857143 },
        { id: 8, weight: 0.071428571 },
      ],
    },
    {
      id: 3,
      linkedWeights: [
        { id: 2, weight: 0.071428571 },
        { id: 3, weight: 0 },
        { id: 4, weight: 0.357142857 },
        { id: 5, weight: 0.071428571 },
        { id: 6, weight: 0.142857143 },
        { id: 7, weight: 0.071428571 },
        { id: 8, weight: 0.071428571 },
      ],
    },
    {
      id: 4,
      linkedWeights: [
        { id: 2, weight: 0.058823529 },
        { id: 3, weight: 0.294117647 },
        { id: 4, weight: 0 },
        { id: 5, weight: 0.058823529 },
        { id: 6, weight: 0.176470588 },
        { id: 7, weight: 0.058823529 },
        { id: 8, weight: 0.117647059 },
      ],
    },
    {
      id: 5,
      linkedWeights: [
        { id: 2, weight: 0.3 },
        { id: 3, weight: 0.1 },
        { id: 4, weight: 0.1 },
        { id: 5, weight: 0 },
        { id: 6, weight: 0.1 },
        { id: 7, weight: 0.3 },
        { id: 8, weight: 0.1 },
      ],
    },
    {
      id: 6,
      linkedWeights: [
        { id: 2, weight: 0.153846154 },
        { id: 3, weight: 0.153846154 },
        { id: 4, weight: 0.230769231 },
        { id: 5, weight: 0.076923077 },
        { id: 6, weight: 0 },
        { id: 7, weight: 0.153846154 },
        { id: 8, weight: 0.230769231 },
      ],
    },
    {
      id: 7,
      linkedWeights: [
        { id: 2, weight: 0.181818182 },
        { id: 3, weight: 0.090909091 },
        { id: 4, weight: 0.090909091 },
        { id: 5, weight: 0.272727273 },
        { id: 6, weight: 0.181818182 },
        { id: 7, weight: 0 },
        { id: 8, weight: 0.090909091 },
      ],
    },
    {
      id: 8,
      linkedWeights: [
        { id: 2, weight: 0.066666667 },
        { id: 3, weight: 0.066666667 },
        { id: 4, weight: 0.133333333 },
        { id: 5, weight: 0.066666667 },
        { id: 6, weight: 0.2 },
        { id: 7, weight: 0.066666667 },
        { id: 8, weight: 0 },
      ],
    },
  ];
}
