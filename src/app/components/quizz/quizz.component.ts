import { Component, OnInit } from '@angular/core';
import quizzQuestions from 'src/assets/data/quizz-questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit{
  title:string = "";
  questions:any;
  questionSelected: any;
  answers:string[] = [];
  answerSelected:string = "";
  questionIndex:number = 0;
  finished:boolean = false;

  ngOnInit(): void {
    if(quizzQuestions){
      this.finished = false;
      this.questionIndex = 0;
      this.title = quizzQuestions.title;
      this.questions = quizzQuestions.questions;
      this.questionSelected = this.questions[this.questionIndex];
    }
  }

  playerChoose(value:string):void{
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex += 1;
    if(this.questionIndex < this.questions.length){
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer:string = await this.checkResults(this.answers);
      this.finished = true
      this.answerSelected = quizzQuestions.results[finalAnswer as keyof typeof quizzQuestions.results];
      console.log(this.answers)
    }
  }

  async checkResults(answers:string[]){
    const results = answers.reduce((previous, current, index, array) =>{
      if(array.filter(element => element === previous).length > array.filter(element => element === current).length){
        return previous
      } else {
        return current
      }
    })

    return results
  }
}
