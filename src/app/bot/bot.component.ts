import { Component, OnInit } from '@angular/core';
import { BotService } from '../bot.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css'],
  animations: [
    trigger('signal', [
      state('active', style({
        'bottom':'0px'
      })),
      state('inactive', style({
        'bottom': '-370px'
      })),
      transition('* => *', animate(500))
    ])
  ]
})
export class BotComponent implements OnInit {

  answer: string

  signalState: string

  constructor(private botService: BotService) {
    this.answer = ''
    this.signalState = 'inactive'
  }

  ngOnInit() {
  }

  sendMsg(mensaje, $event) {
    if($event.keyCode == 13){
      $event.target.value = ''

      document.getElementById('chat').innerHTML = document.getElementById('chat').innerHTML + `<div class="row d-flex justify-content-end"><p style="background-color: #ddd" class="border rounded p-2">${mensaje}</p></div>`

      this.botService.sendMensaje(mensaje).then(res => {
        // console.log(res)
        this.answer = res['mensaje']

        document.getElementById('chat').innerHTML = document.getElementById('chat').innerHTML +`<div class="row"><p class="bg-white border p-2">${this.answer}</p></div>`

      })

    }


  }

  changeStatus() {
    this.signalState = (this.signalState === 'inactive') ? 'active' : 'inactive'
  }

}
