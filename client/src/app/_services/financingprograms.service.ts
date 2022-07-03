import { Injectable } from "@angular/core";
import { FinancingProgram } from "app/_models/farm/financingprogram";
import { Criteria } from "app/_models/farm/criteria";

@Injectable({
  providedIn: "root",
})
export class FinancingProgramsService {
  availableFinancingPrograms: FinancingProgram[] = [
    new FinancingProgram(1, "Submasura 4.1","Scopul investițiilor sprijinite în cadrul acestei submăsuri este sprijinirea investițiilor pentru creșterea competitivității exploataților agricole prin dotarea cu utilaje și echipamente performante în raport cu structura agricolă actuală, precum și investițiile pentru modernizarea fermei (în special cele de dimensiuni medii și asocieri de ferme mici și medii) și îmbunătățirea calității activelor fixe." ,[
      new Criteria(
        1,
        "Dimensiune totala ferma (Ha)",
        "Dimensiune",
        3,
        false,
        [],
        true,
        100,
        1200
      ),
      new Criteria(2, "Cultura", "Cultura", 3, true, ["Porumb", "Grâu"]),
      new Criteria(3, "Ingrasaminte utilizate", "Ingrasaminte", 3, true, [
        "XMC-25",
      ]),
      new Criteria(
        3,
        "Zonă cu potențial agricol ridicat (conform studiului ICPA)",
        "Zona",
        4,
        true,
        [
          "Alba Iulia",
          "Arges",
          "Arad",
          "Bacau",
          "Bihor",
          "Bistrita Nasaud",
          "Brasov",
          "Buzau",
          "Cluj",
          "Constanta",
          "Satu Mare"
        ]
      ),
      new Criteria(
        3,
        "Zonă cu potențial agricol mediu (conform studiului ICPA)",
        "Zona",
        2,
        true,
        [
          "Dambovita",
          "Dolj",
          "Gorj",
          "Giurgiu",
          "Hunedoara",
          "Harghita",
          "Mehedinti",
          "Maramures",
        ]
      ),
    ]),
    new FinancingProgram(2, "Submasura 4.3","Scopul investițiilor sprijinite în cadrul acestei submăsuri este de îmbunătățire a performanței economice a tuturor fermelor şi de facilitare a restructurării şi modernizării fermelor, în special în vederea creşterii participării şi orientării către piaţă, dar şi a diversificării agricole.", [
      new Criteria(
        1,
        "Dimensiune totala ferma (Ha)",
        "Dimensiune",
        3,
        false,
        [],
        true,
        100,
        1200
      ),
      new Criteria(2, "Cultura", "Cultura", 3, true, ["Grâu"]),
      new Criteria(3, "Ingrasaminte utilizate", "Ingrasaminte", 5, true, [
        "AAPST-2",
      ]),
      new Criteria(
        3,
        "Zonă cu potențial agricol ridicat (conform studiului ICPA)",
        "Zona",
        4,
        true,
        [
          "Alba Iulia",
          "Arges",
          "Arad",
          "Bacau",
          "Bihor",
          "Bistrita Nasaud",
          "Brasov",
          "Buzau",
          "Cluj",
          "Constanta",
        ]
      ),
      new Criteria(
        3,
        "Zonă cu potențial agricol mediu (conform studiului ICPA)",
        "Zona",
        2,
        true,
        [
          "Dambovita",
          "Dolj",
          "Gorj",
          "Giurgiu",
          "Hunedoara",
          "Harghita",
          "Mehedinti",
          "Maramures",
        ]
      ),
    ]),
    new FinancingProgram(3, "Submasura 6.3","Scopul investițiilor sprijinite în cadrul acestei submăsuri este sprijinirea investițiilor pentru creșterea competitivității exploataților agricole prin dotarea cu utilaje și echipamente performante în raport cu structura agricolă actuală, precum și investițiile pentru modernizarea fermei (în special cele de dimensiuni medii și asocieri de ferme mici și medii) și îmbunătățirea calității activelor fixe.", [
      new Criteria(
        1,
        "Dimensiune totala ferma (Ha)",
        "Dimensiune",
        4,
        false,
        [],
        true,
        100,
        1200
      ),
      new Criteria(2, "Cultura", "Cultura", 3, true, ["Lucerna"]),
      new Criteria(3, "Ingrasaminte utilizate", "Ingrasaminte", 5, true, [
        "XMC-25",
      ]),
    ]),
    new FinancingProgram(4, "Submasura 17.1","Scopul acestei submăsuri este: \n- încurajarea fermierilor să participe la schemele de asigurare private în vederea gestionării corespunzătoare a riscurilor care le pot afecta producția agricolă; \n- stimularea fermierilor pentru a beneficia de asigurare și extinderea sferei riscurilor asigurabile de către societățile de asigurare. ", [
      new Criteria(
        1,
        "Dimensiune totala ferma (Ha)",
        "Dimensiune",
        4,
        false,
        [],
        true,
        50,
        300
      ),
      new Criteria(2, "Animale crescute", "Animale", 3, true, [
        "Taurine",
        "Porcine",
        "Ovine",
      ]),
    ]),
  ];
}
