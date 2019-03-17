import { Component, OnInit } from '@angular/core';
import { BotService } from '../bot.service';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit {

  answer: string

  constructor(private botService: BotService) {
    this.answer = ''
  }

  ngOnInit() {
  }

  sendMsg(mensaje, $event) {
    if($event.keyCode == 13){
      document.getElementById('chat').innerHTML = document.getElementById('chat').innerHTML + `<div><p class="text-right">${mensaje}</p></div>`

      this.botService.sendMensaje(mensaje).then(res => {
        // console.log(res)
        this.answer = res['mensaje']

        document.getElementById('chat').innerHTML = document.getElementById('chat').innerHTML +`<div><p style="width: 220px">${this.answer}</p></div>`

      })

    }

  }

}
