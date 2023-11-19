import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/companies/model/post';
import { DevelopersService } from 'src/app/developers/services/developers.service';
import { MatDialog } from '@angular/material/dialog';
import { toInteger } from 'lodash';
import { NotificationDialogComponent } from 'src/app/companies/pages/home-company/notification-dialog/notification-dialog.component';
import { MessageDialogComponent } from 'src/app/companies/pages/find-your-dev/message-dialog/message-dialog.component';
import { SurveyComponent } from 'src/app/public/survey/survey.component';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    posts: Array<Post> = [];
    constructor(private service: DevelopersService, private dialog: MatDialog) {}
    ngOnInit(): void {



        this.service.GetAllPosts().subscribe((response: any) => {
            this.posts = response;
            console.log(this.posts);
        });

        const id = toInteger(localStorage.getItem('id'));
        let developer: any;
        this.service.GetDeveloperById(id).subscribe((response: any) => {
            developer = response;
            console.log(developer);
            if (developer.rate == null) {
                this.openDialogSurvey();
            }
        });

        this.service.getTechnologiesByDigitalProfileId(id).subscribe((technologies: any) => {
            // technologies ahora contiene la información de las tecnologías asociadas al perfil digital del usuario

            // Carga las publicaciones y ordena según la similitud de tecnologías
            this.service.GetAllPosts().subscribe((response: any) => {
                this.posts = response.sort((a:Post, b:Post) => {
                    // Lógica para calcular la similitud entre las tecnologías del usuario y las del post
                    const similarityA = this.calculateSimilarity(a, technologies);
                    const similarityB = this.calculateSimilarity(b, technologies);

                    // Ordena de forma descendente
                    return similarityB - similarityA;
                });
            });
        });
    }
    calculateSimilarity(post: Post, userTechnologies: any): number {
        // Combina el título y la descripción en una sola cadena
        const postText = `${post.title} ${post.description}`;

        // Divide la cadena en palabras
        const postWords = postText.toLowerCase().match(/\b\w+\b/g);

        // Verifica que postWords no sea null antes de usar filter
        const relevantWords = postWords ? postWords.filter(word =>
            userTechnologies.includes(word.toLowerCase())
        ) : [];

        // Devuelve la longitud del array de palabras relevantes como medida de similitud
        return relevantWords.length;
    }

    openMessageDialog(id: number) {
        this.dialog.open(MessageDialogComponent, {
            data: id,
        });
    }
    openNotificationDialog(id: number) {
        this.dialog.open(NotificationDialogComponent, {
            data: id,
        });
    }
    openDialogSurvey() {
        this.dialog.open(SurveyComponent, {
            data: {
                user: 'developer',
            },
        });
    }
}
