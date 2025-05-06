import { Component, computed, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameBoardComponent } from "../game-board/game-board.component";

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [GameBoardComponent],
    templateUrl: './game.component.html',
    styleUrl: './game.component.css'
})
export class GameComponent {
    private gameService = inject(GameService);
    playerCharacters = computed(() => this.gameService.playerCharacters());
}
