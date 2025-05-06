import { Component, computed, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CharacterCreationComponent } from "../character-creation/character-creation.component";

@Component({
    selector: 'app-game-menu',
    standalone: true,
    imports: [CharacterCreationComponent],
    templateUrl: './game-menu.component.html',
    styleUrl: './game-menu.component.css'
})
export class GameMenuComponent {
    @Output() startGame = new EventEmitter();
    private gameService = inject(GameService);
    ifCreatePlayerCharacter: boolean = false;
   
   
    

    generatePlayerCharacters(){
        this.ifCreatePlayerCharacter = !this.ifCreatePlayerCharacter;
    }

    generateEnemies(number: number){
        this.gameService.generateEnemies(number);
        console.log(this.gameService.enemyCharacters());
    }

    onStartGame(){
        this.startGame.emit();
    }
}
