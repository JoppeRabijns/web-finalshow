//@ts-nocheck
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.scss']
})
export class ShowroomComponent implements OnInit {

  constructor() { }

  goTo2D(){
    document.getElementById('linkTo2D')?.addEventListener('click', function(){
      window.location.href = '/hub';
    })
  }
  async fetchNominees(): Promise<Response> {
    const req = await fetch('https://finalshowcase.herokuapp.com/admin/get-nominations');
    return await req.json();
  }

  fetchProjects(): Promise<Response>{
    return fetch("https://finalshowcase.herokuapp.com/final-work/get-all").then((req: any) => {
      return req.json().then((data: any) => {
        return data;
      });
    });
  }

  async fetchSingleProject(project: String): Promise<Response>{
    const req = await fetch(`https://finalshowcase.herokuapp.com/final-work/search-name/${project}`);
    return await req.json();
  }

  clusterMenu(): String {
    const buttons = document.getElementsByClassName('bottom-menu-cluster');
    let cluster = "web";
    document.querySelector(`a.${cluster}`).classList.add("active");
    for (let button of buttons as Array) {
      button.addEventListener("click", () => {
        cluster = button.classList[0];
        button.classList.add("active");
        const children = button.parentNode.children;
        for (let child of children as array) {
          if(child.classList[0] != cluster) {
            child.classList.remove("active");
          }
        }
        //getapi(api_url);
      });
    }
    return cluster;
  }

  ngOnInit() {
    this.goTo2D();
    let cluster = this.clusterMenu();
    this.fetchProjects().then((data: any) => {
      displayData(data);
    });
  
    //API call

    //getapi(api_url);

    //Na API Call alle projecten inladen, rangschikken per cluster en deze printen adhv keuze gebruiker

    function displayData(data) {
      let nomineesID: String[] = [];
      fetch('https://finalshowcase.herokuapp.com/final-work/get-all').then((clusters: any) => {
        for (const [key, value] of Object.entries(clusters)) {
          //@ts-ignore
          for (let project of value) {
            nomineesID.push(project.projectid);
          }
          //@ts-check
        }
      })

      let started = false;
      const projecten = data.filter(p => p.cluster == cluster);
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
        let htmlString =`<img class="coverphoto" src="${project.images}">`;
        if(project.winner){
          htmlString += `<img src="assets/images/flagwinnerNoWEBGL.svg" class="showroomflag-winner" alt="...">`
        }else {
          for (let id of nomineesID) {
            if (id == project.projectid){
            htmlString += `<img src="assets/images/flagnomineeNoWEBGL.svg" class="showroomflag-nominee" alt="...">`
            }
          };
        }
        htmlString += `<h2>${project.name}</h2>
          <a  class="personName" href="mailto:${project.email}"><h3>${project.username}</h3></a>
          <h4>Beschrijving</h4>
          <p>${project.description}<br><br><a id="projectvideo" target="_blank" href="${project.url}">Bekijk de projectvideo</a></p>
          `;
        document.querySelector(".projecten").innerHTML = htmlString;
      });
      previousProject.addEventListener("click", function(){
        if (projecten.current == 0){
            projecten.current = projecten.length;
        }
        project = projecten.prev();
        document.querySelector(".hoeveelheid").innerHTML = `${projecten.current+1}/${projecten.length}`;
        let htmlString =`<img class="coverphoto" src="${project.images}">`;
        if(project.winner){
          htmlString += `<img src="assets/images/flagwinnerNoWEBGL.svg" class="showroomflag-winner" alt="...">`
        }else {
          for (let id of nomineesID) {
            if (id == project.projectid){
            htmlString += `<img src="assets/images/flagnomineeNoWEBGL.svg" class="showroomflag-nominee" alt="...">`
            }
          };
        }
        htmlString += `<h2>${project.name}</h2>
          <a  class="personName" href="mailto:${project.email}"><h3>${project.username}</h3></a>
          <h4>Beschrijving</h4>
          <p>${project.description}<br><br><a id="projectvideo" target="_blank" href="${project.url}">Bekijk de projectvideo</a></p>
          `;
        document.querySelector(".projecten").innerHTML = htmlString;
      });
    
    
      if(!started) {
        let htmlString =`<img class="coverphoto" src="${project.images}">`;
        if(project.winner){
          htmlString += `<img src="assets/images/flagwinnerNoWEBGL.svg" class="showroomflag-winner" alt="...">`
        }else {
          for (let id of nomineesID) {
            if (id == project.projectid){
            htmlString += `<img src="assets/images/flagnomineeNoWEBGL.svg" class="showroomflag-nominee" alt="...">`
            }
          };
        }
        htmlString += `<h2>${project.name}</h2>
          <a  class="personName" href="mailto:${project.email}"><h3>${project.username}</h3></a>
          <h4>Beschrijving</h4>
          <p>${project.description}<br><br><a id="projectvideo" target="_blank" href="${project.url}">Bekijk de projectvideo</a></p>
          `;
        document.querySelector(".projecten").innerHTML = htmlString;
        started = true;
      }
    }
  }

}
