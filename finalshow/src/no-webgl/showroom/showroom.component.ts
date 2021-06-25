//@ts-nocheck
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.scss']
})
export class ShowroomComponent implements OnInit {

  fetchedProjects: any[] = [];
  fetchedNominees: any[] = [];
  fetchedSuperNominees: any[] = [];
  cluster: String = "web";

  constructor() { }

  goTo2D(){
    document.getElementById('linkTo2D')?.addEventListener('click', function(){
      window.location.href = 'https://finalshow.herokuapp.com/hub';
    })
  }
  fetchNominees(): any {
    fetch("https://finalshowcase.herokuapp.com/admin/get-nominations").then((data: any) => {
      data.json()
        .then((nominees:any) => {
          this.fetchedNominees = nominees;
        }).then(() => {
          this.fetchSuperNominees();
        })
    });
  }

  fetchProjects(): void {
    fetch("https://finalshowcase.herokuapp.com/final-work/get-all").then((data: any) => {
      data.json()
        .then((projects:any) => {
          this.fetchedProjects = projects
        }).then(() => {
          this.fetchNominees();
        })
    });
  }

  fetchSuperNominees() {
    fetch("https://finalshowcase.herokuapp.com/admin/get-superprijs-nominations").then((data: any) => {
      data.json()
        .then((supers:any) => {
          this.fetchedSuperNominees = supers;
        }).then(() => {
          this.displayData();
        })
    });
}

  async fetchSingleProject(project: String): Promise<Response>{
    const req = await fetch(`https://finalshowcase.herokuapp.com/final-work/search-name/${project}`);
    return await req.json();
  }

  clusterMenu(): String {
    const buttons = document.getElementsByClassName('bottom-menu-cluster');

    document.querySelector(`a.${this.cluster}`).classList.add("active");
    for (let button of buttons as Array) {
      button.addEventListener("click", () => {
        this.cluster = button.classList[0];
        button.classList.add("active");
        const children = button.parentNode.children;
        for (let child of children as array) {
          if(child.classList[0] != this.cluster) {
            child.classList.remove("active");
          }
        }
        this.fetchProjects();
      });
    }
  }

  displayData() {
    this.clusterMenu();
    let cluster: String = this.cluster;
    let nomineesID: String[] = [];
    for (const [key, value] of Object.entries(this.fetchedNominees)) {
      for (let project of value) {
        nomineesID.push(project.projectid);
      }
    }
    let supersID: Number[] = [];
      for (const [key, value] of Object.entries(this.fetchedSuperNominees)) {
        supersID.push(value.projectid);
      }
    function renderCard(project: any, nomineesID: Number[]) {
      let htmlString =`<img class="coverphoto" src="${project.images}">`;
      if (project.superwinnaar){
        htmlString += `<img src="assets/images/flagsuperNoWEBGL.png" class="showroomflag-winner" alt="...">`
      } else if(project.winner){
        htmlString += `<img src="assets/images/flagwinnerNoWEBGL.png" class="showroomflag-winner" alt="...">`
      } 
      for (let id of supersID) {
          if (id == project.projectid && !project.superwinnaar) {
              htmlString += `<img src="assets/images/flagsupergenomineerdNoWEBGL.png" class="showroomflag-nominee2" alt="...">`
          }
      }
      for (let id of nomineesID) {
        if (id == project.projectid && !project.winner){
        htmlString += `<img src="assets/images/flagnomineeNoWEBGL.png" class="showroomflag-nominee" alt="...">`
        }
      }
      
      htmlString += `<h2>${project.name}</h2>
        <a  class="personName" href="mailto:${project.email}"><h3>${project.username}</h3></a>
        <h4>Beschrijving</h4>
        <p>${project.description}<br><br><a id="projectvideo" target="_blank" href="${project.url}">Bekijk de projectvideo</a></p>
        `;
      document.querySelector(".projecten").innerHTML = htmlString;
    }
    let started = false;
    const projecten = this.fetchedProjects.filter(p => p.cluster == cluster);
    Array.prototype.next = function() {
        return this[++this.current];
    };
    Array.prototype.prev = function() {
        return this[--this.current];
    };
    Array.prototype.current = 0;

    document.querySelector(".hoeveelheid").innerHTML = `${projecten.current+1}/${projecten.length}`;
    var project = projecten[0];
    var nextProject = document.querySelector(".right");
    var previousProject = document.querySelector(".left");

    nextProject.addEventListener("click", function(){
      if (projecten.length-1 == projecten.current){
          projecten.current = -1;
      }
      project = projecten.next();
      document.querySelector(".hoeveelheid").innerHTML = `${projecten.current+1}/${projecten.length}`;
      renderCard(project, nomineesID);
    });

    previousProject.addEventListener("click", function(){
      if (projecten.current == 0){
          projecten.current = projecten.length;
      }
      project = projecten.prev();
      document.querySelector(".hoeveelheid").innerHTML = `${projecten.current+1}/${projecten.length}`;
      renderCard(project, nomineesID)
    });

    if(!started) {
      renderCard(project, nomineesID);
      started = true;
    }
  }

  ngOnInit() {
    this.goTo2D();  
    this.fetchProjects();
  }
}