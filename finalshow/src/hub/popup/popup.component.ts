//@ts-nocheck
import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { ShowroomComponent } from '../showroom/showroom.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class PopupComponent implements OnInit {

  fetchedProjects: any[] = [];
  fetchedNominees: any[] = [];
  fetchedSuperNominees: any[] = [];
  cluster: String = "web";

  showPopup(renderer:THREE.WebGLRenderer,cssrenderer:any,controls:ORBIT.OrbitControls,poiName:any){

    let popup=document.getElementById("popup");
    document.getElementById("showPopup")!.style.display="block";
    renderer.domElement.style.filter="blur(4px)";
    cssrenderer.domElement.style.filter="blur(4px)";
    controls.enabled=false;

    if(poiName=="Showcase"){

      popup!.innerHTML=`
      <div id="back" class="back">
        <p>X<span class="close">Sluiten</span></p>
        </div>
      <div class="background"></div>
      <div class="standaardmenu">
        </div>
            <div class="wrapper">
        <div class="upper-nav">
            <h3 class="hoeveelheid">1/X</h3>
            </div>
            </div>
            <img class="left" src="assets/images/arrow.svg">
            <img class="right" src="assets/images/arrow.svg">
            <div class="pop-up">
                <img class="logobackground" src="assets/images/logobackground.png">
                <div class="projecten"></div>
                <div class="bottom-menu">
                    <a class="web bottom-menu-cluster"><h5>Web</h5></a>
                    <a class="ar bottom-menu-cluster"><h5>Alternate Reality</h5></a>
                    <a class="motion bottom-menu-cluster"><h5>Interactive Motion</h5></a>
                    <a class="digital-making bottom-menu-cluster"><h5>Digital Making</h5></a>
                    <a class="mobile bottom-menu-cluster"><h5>Mobile Appliance</h5></a>
                </div>
            </div>`;
            this.initFunctionShowroom();
            this.removeInnerhtml(controls, renderer, cssrenderer);

    }
    if(poiName=="FAQ"){

      popup!.innerHTML=`
      <div id="back" class="back2">
        <p>X<span class="close">Sluiten</span></p>
        </div>
      <div class="background"></div>
      <div class="standaardmenu">
      </div>
      
      <div class="pop-up faq">
      <div id="titelBtn" class="titelBtn">
            <img class="logobackgroundFaq" src="assets/images/logobackground.png">
      <div class="items vraag1 active"><h5 id=" vraag1" >Wat is de Final Show?</h5></div>
      <div class="items vraag2"><h5 id=" vraag2">Hoe zal de Final Show doorgaan?</h5></div>
      <div class="items vraag3"><h5 id="vraag3">Waarom hapert de livestream?</h5></div> 
      <div class="items vraag4"><h5 id="vraag4">Waar vind ik meer info over de opleiding?</h5></div> 
      <div class="items vraag5"><h5 id="vraag5">Hoe kan ik de school contacteren?</h5></div>
      
      </div>
      <div id="hideInfo" class="hideInfo">
      <div class="results vraag1">
      <h5 id="titel">Wat is de Final Show?</h5><br>
      <p id="info">De Final Show is een evenement waar eindejaarsstudenten van de opleiding Multimedia & Communicatietechnologie aan de Erasmushogeschool Brussel in de spotlight worden gezet. Hier kunnen ze tonen waar ze de voorbije maanden mee bezig zijn geweest. Dit is ook de ideale gelegenheid om contacten te leggen tussen werkgevers en potentiële werknemers</p>
      </div>
      <div class=" results vraag2">
      <h5 id="titel">Hoe zal de Final Show doorgaan?</h5><br>
      <p id="info">Dit jaar zal de Final Show te zien zijn via een livestream. De livestream kan je bekijken zonder een account aan te maken. Enkel wanneer je wilt chatten zullen we je vragen om snel een account aan te maken.</p>
      </div>
      <div class="results vraag3">
      <h5 id="titel">Waarom hapert de livestream?</h5><br>
      <p id="info">Een stabiele internetconnectie is nodig om de livestream vloeiend te kunnen bekijken. Sluit ook onnodige openstaande tabs af, dit kan uw toestel en dus de stream vertragen.</p>
      </div>
      <div class=" results vraag4">
      <h5 id="titel">Waar vind ik meer info over de opleiding?</h5><br>
      <p id="info">Meer info hierover kan je op <a href="https://www.erasmushogeschool.be/nl/opleidingen/multimedia-creative-technologies" style="border-bottom: 2px solid #2FE6DE; color: black;"  target="_blank"> de website van EHB </a> vinden.</p>
      </div>
      <div class="results vraag5">
      <h5 id="titel">Hoe kan ik de school contacteren?</h5><br>
      <p id="info">Meer info hierover kan je op <a href="https://www.erasmushogeschool.be/nl/" target="_blank" style="border-bottom: 2px solid #2FE6DE; color: black;">de website van EHB</a> vinden.</p>
      </div>
      </div>
      </div>`;

      this.initFunctionFaq();
      this.removeInnerhtml(controls, renderer, cssrenderer);

    }
    if(poiName=="Timetable"){

      popup!.innerHTML=`
      <div id="back" class="back2">
        <p>X<span class="close">Sluiten</span></p>
        </div>
      <div class="background"></div>
      <div class="standaardmenu">
        </div>
      <div class="pop-up timetablepu">
        <img class="logobackground4" src="assets/images/logobackground.png">
        <img class="logobackground5" src="assets/images/logobackground.png">
        <img class="logobackground6" src="assets/images/logobackground.png">
        <div class="timetable">
        <div class="event1 timetableevent">
            <h2>Start Livestream</h2>
            <h2 class="uur">18u00</h2>
            <p>Om 18u00 gaat de Final Show van Multimedia & Creative technologies van start!</p>
        </div>
        <div class="event2 timetableevent">
            <h2>Cluster Mobile Appliance</h2>
            <h2 class="uur">18u05</h2>
            <p>De projecten van de studenten Mobile Appliance worden geshowcased!</p>
        </div>
        <div class="event3 timetableevent">
            <h2>Cluster Alternate Reality</h2>
            <h2 class="uur">18u10</h2>
            <p>De cluster Alternate Reality neemt ons mee naar de wereld van VR en AR.</p>
        </div>
        <div class="event4 timetableevent">
            <h2>SEADS</h2>
            <h2 class="uur">18u15</h2>
            <p>Live vanuit Brugge nemen we een kijkje naar het werk van onze ehb-studenten bij SEADS (Space Ecologies Art and Design).</p>
        </div>
        <div class="event5 timetableevent">
            <h2>Cluster Web</h2>
            <h2 class="uur">18u25</h2>
            <p>Meer dan gewoon websites. De cluster Web toont de mogelijkheden van webdesign -en development.</p>
        </div>
        <div class="event6 timetableevent">
            <h2>Motion</h2>
            <h2 class="uur">18u30</h2>
            <p>Geen final show zonder spectaculaire visuals. De cluster Motion weet raad.</p>
        </div>
        <div class="event7 timetableevent">
            <h2>Waar is manneke pis?</h2>
            <h2 class="uur">18u35</h2>
            <p>De conclusie van de epische saga...</p>
        </div>
        <div class="event8 timetableevent">
            <h2>Cluster Digital Making</h2>
            <h2 class="uur">18u40</h2>
            <p>De artistieke kant van de opleiding. De cluster Digital Making.</p>
        </div>
        <div class="event9 timetableevent">
            <h2>Fresh Awards</h2>
            <h2 class="uur">18u45</h2>
            <p>Elk succesverhaal heeft een begin. Een award voor het beste van onze eerstejaars!</p>
        </div>
        <div class="event10 timetableevent">
            <h2>Speech Jurgen Dedeckere</h2>
            <h2 class="uur">18u50</h2>
            <p>Speech door ons opleidingshoofd Jurgen Dedeckere.</p>
        </div>
        <div class="event11 timetableevent">
            <h2>Super Awards</h2>
            <h2 class="uur">18u55</h2>
            <p>Het beste van het beste. Eén project wordt bekroond met de Super Award!</p>
        </div>
        <div class="event12 timetableevent">
            <h2>Slot</h2>
            <h2 class="uur">19u00</h2>
        </div>
      </div>
      <div class="chooseTime">
      <div class="item event1 active"><h5>18u00</h5>
      <h6>Start Livestream</h6></div>
      <div class="item event2"><h5>18u05</h5>
      <h6>Cluster Mobile Appliance</h6></div>
      <div class="item event3"><h5>18u10</h5>
      <h6>Cluster Alternate Reality</h6></div>
      <div class="item event4"><h5>18u15</h5>
      <h6>SEADS</h6></div>
      <div class="item event5"><h5>18u25</h5>
      <h6>Cluster Web</h6></div>
      <div class="item event6"><h5>18u30</h5>
      <h6>Motion</h6></div>
      <div class="item event7"><h5>18u35</h5><h6>Waar is manneke pis?</h6></div>
      <div class="item event8"><h5>18u40</h5><h6>Cluster Digital Making</h6></div>
      <div class="item event9"><h5>18u45</h5><h6>Fresh Awards</h6></div>
      <div class="item event10"><h5>18u50</h5><h6>Speech Jurgen Dedeckere</h6></div>
      <div class="item event11"><h5>18u55</h5><h6>Super Awards</h6></div>
      <div class="item event12"><h5>19u00</h5><h6>Slot</h6></div>
      </div>
      </div>`;

      this.initFunctionTimetable();
      this.removeInnerhtml(controls, renderer, cssrenderer);

    }
  }

  initFunctionFaq() {
    //Script voor divs te doen verschijnen doormiddel van het klikken van één van de FAQ vragen in FAQ.html
    var faqButtons = document.querySelectorAll(".items");
    faqButtons.forEach(button => {
   
    button.addEventListener("click",function(){
        var showEvent = button.classList[1];
        let childs = [].slice.call(button.parentNode.children);
        childs.forEach(child => {
            if(child.classList[1] != showEvent) {
                child.classList.remove("active");
                button.classList.add("active");
            }
        });
           let siblings = document.querySelectorAll(".results");
        siblings.forEach(sibling => {
            if(sibling.classList[1] != showEvent) {

                sibling.style.display ='none';
            }
            else {
                sibling.style.display ='block';
            }
        });
        
    })
  });
  }

  initFunctionTimetable() {
    //Script voor divs te doen verschijnen doormiddel van het klikken van één van de timetable evenementen in timetable.html
    var timetablebuttons = document.querySelectorAll(".item");
    timetablebuttons.forEach(button => {
    button.addEventListener("click",function(){
        var showEvent = button.classList[1];

        var children = [].slice.call(button.parentNode.children);
        children.forEach(child => {
            if(child.classList[0] != showEvent) {
                child.classList.remove("active");
                button.classList.add("active");
            }
        });

        var siblings = document.querySelectorAll(".timetableevent");
        siblings.forEach(sibling => {
            if(sibling.classList[0] != showEvent) {
                sibling.style.display ='none';
                
            }
            else {
                sibling.style.display ='block';
            }
        });
        
    })

  })
  }

  initFunctionShowroom() {
    let fetchedProjects: any[] = this.fetchedProjects;
    let fetchedNominees: any[] = this.fetchedNominees;
    let fetchedSuperNominees: any[] = this.fetchedSuperNominees;
    let cluster: String = this.cluster;
    fetchProjects();

    function fetchNominees() {
        fetch("https://finalshowcase.herokuapp.com/admin/get-nominations").then((data: any) => {
          data.json()
            .then((nominees:any) => {
              fetchedNominees = nominees;
            }).then(() => {
                fetchSuperNominees();
            })
        });
    }

    function fetchSuperNominees() {
        fetch("https://finalshowcase.herokuapp.com/admin/get-superprijs-nominations").then((data: any) => {
          data.json()
            .then((supers:any) => {
              fetchedSuperNominees = supers;
            }).then(() => {
              displayData();
            })
        });
    }
    
    function fetchProjects(): void {
      fetch("https://finalshowcase.herokuapp.com/final-work/get-all").then((data: any) => {
        data.json()
          .then((projects:any) => {
            fetchedProjects = projects
          }).then(() => {
            fetchNominees();
          })
      });
    }

    function clusterMenu() {
      const buttons = document.getElementsByClassName('bottom-menu-cluster');
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
          fetchProjects();
        });
      }
    }

    function displayData() {
      clusterMenu();
      let nomineesID: Number[] = [];
      for (const [key, value] of Object.entries(fetchedNominees)) {
        for (let project of value) {
          nomineesID.push(project.projectid);
        }
      }
      let supersID: Number[] = [];
      for (const [key, value] of Object.entries(fetchedSuperNominees)) {
        supersID.push(value.projectid);
      }
      function renderCard(project: any, nomineesID: Number[]) {
        let htmlString =`<img class="coverphoto" src="${project.images}">`;
        if (project.superwinnaar){
          htmlString += `<img src="assets/images/flagsuperNoWEBGL.png" class="showroomflag-winner2" alt="...">`
        } else if(project.winner){
          htmlString += `<img src="assets/images/flagwinnerNoWEBGL.png" class="showroomflag-winner" alt="...">`
        } else {
            for (let id of supersID) {
                if (id == project.projectid) {
                    htmlString += `<img src="assets/images/flagsupergenomineerdNoWEBGL.png" class="showroomflag-nominee2" alt="...">`
                }
            }
            for (let id of nomineesID) {
              if (id == project.projectid){
              htmlString += `<img src="assets/images/flagnomineeNoWEBGL.png" class="showroomflag-nominee" alt="...">`
              }
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
      const projecten = fetchedProjects.filter(p => p.cluster == cluster);
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
  }

  removeInnerhtml(controls:any, renderer:any, cssrenderer:any){
    document.getElementById("back")?.addEventListener('click', function(){
        document.getElementById('showPopup')?.style.display = 'none';
        renderer.domElement.style.filter="blur(0px)";
        cssrenderer.domElement.style.filter="blur(0px)";
        controls.enabled=true;
    })
  }

  ngOnInit(): void {
  }

}
