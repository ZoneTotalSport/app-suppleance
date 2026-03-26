// ==========================================
// BANQUE DE JEUX — MA SUPPLÉANCE EPS
// Jeux classés par niveau et catégorie
// ==========================================

var JEUX_BANK = {

  // ===== PRÉSCOLAIRE / MATERNELLE (4-6 ans) =====
  prescolaire: {
    label: "Préscolaire / Maternelle",
    icon: "🧒",
    jeux: [
      // -- Poursuite --
      {cat:"Poursuite",titre:"Chat et Souris",desc:"Un chat poursuit les souris. Touché = on devient chat.",duree:"8 min",materiel:"Aucun",intensite:"Élevé"},
      {cat:"Poursuite",titre:"Le Loup et les Moutons",desc:"Le loup dort dans sa tanière. Les moutons s'approchent. Quand le loup se réveille, tous courent!",duree:"10 min",materiel:"Cônes",intensite:"Élevé"},
      {cat:"Poursuite",titre:"1-2-3 Soleil",desc:"Un meneur face au mur compte. Les autres avancent. On se fige quand il se retourne!",duree:"10 min",materiel:"Aucun",intensite:"Moyen"},
      {cat:"Poursuite",titre:"Queue du Renard",desc:"Chaque enfant a un foulard dans le pantalon. Il faut voler les queues des autres!",duree:"8 min",materiel:"Foulards",intensite:"Élevé"},
      {cat:"Poursuite",titre:"Les Requins et Poissons",desc:"Les requins au centre essaient de toucher les poissons qui traversent le gymnase.",duree:"10 min",materiel:"Cônes",intensite:"Élevé"},
      {cat:"Poursuite",titre:"La Rivière aux Crocodiles",desc:"Traverser la rivière sans se faire toucher par les crocodiles!",duree:"8 min",materiel:"Lignes au sol",intensite:"Élevé"},
      {cat:"Poursuite",titre:"Chat Glacé",desc:"Le chat touche = on gèle. Un ami doit passer entre tes jambes pour te libérer.",duree:"10 min",materiel:"Dossards",intensite:"Élevé"},
      {cat:"Poursuite",titre:"Les Lapins dans le Terrier",desc:"3 par groupe: 2 font le terrier (bras en arc), 1 est le lapin. Au signal, les lapins changent de terrier!",duree:"8 min",materiel:"Aucun",intensite:"Moyen"},
      // -- Coopération --
      {cat:"Coopération",titre:"Le Parachute Géant",desc:"Tous tiennent le parachute. Faire des vagues, soulever, faire rouler un ballon dessus.",duree:"15 min",materiel:"Parachute",intensite:"Moyen"},
      {cat:"Coopération",titre:"Le Déménagement",desc:"Transporter des objets d'un endroit à l'autre en équipe sans les échapper.",duree:"10 min",materiel:"Sacs de fèves, cerceaux",intensite:"Moyen"},
      {cat:"Coopération",titre:"Les Statues Musicales",desc:"Danser quand la musique joue, se figer quand elle arrête. Celui qui bouge aide l'enseignant.",duree:"10 min",materiel:"Musique",intensite:"Moyen"},
      {cat:"Coopération",titre:"Le Serpent",desc:"En file indienne, tenir la taille de l'autre. La tête du serpent essaie d'attraper sa queue!",duree:"8 min",materiel:"Aucun",intensite:"Moyen"},
      // -- Manipulation --
      {cat:"Manipulation",titre:"Bowling Humain",desc:"Lancer un ballon pour renverser des quilles (bouteilles). Chaque enfant replace les quilles.",duree:"15 min",materiel:"Ballons, bouteilles",intensite:"Faible"},
      {cat:"Manipulation",titre:"Le Facteur",desc:"Courir en cercle, déposer un foulard derrière quelqu'un. Cette personne doit poursuivre le facteur!",duree:"10 min",materiel:"Foulard",intensite:"Moyen"},
      {cat:"Manipulation",titre:"Lancer aux Cerceaux",desc:"Lancer des sacs de fèves dans des cerceaux placés à différentes distances.",duree:"12 min",materiel:"Sacs de fèves, cerceaux",intensite:"Faible"},
      {cat:"Manipulation",titre:"Relais des Animaux",desc:"Courir comme un animal (grenouille, crabe, ours) jusqu'au cône et revenir. L'équipe la plus rapide gagne!",duree:"12 min",materiel:"Cônes",intensite:"Élevé"}
    ]
  },

  // ===== 1ER CYCLE (1re-2e année, 6-8 ans) =====
  cycle1: {
    label: "1er Cycle (1re-2e)",
    icon: "🏃",
    jeux: [
      {cat:"Poursuite",titre:"Chat Perché",desc:"Fuir le chat. Pour être en sécurité, monter sur un banc! Max 5 secondes perché.",duree:"10 min",materiel:"Bancs",intensite:"Élevé"},
      {cat:"Poursuite",titre:"L'Épervier",desc:"Un épervier au centre. Les autres traversent le gymnase sans se faire toucher.",duree:"10 min",materiel:"Cônes",intensite:"Élevé"},
      {cat:"Poursuite",titre:"Touche-Couleur",desc:"Le meneur crie une couleur. Tous doivent toucher un objet de cette couleur avant le chat!",duree:"8 min",materiel:"Aucun",intensite:"Élevé"},
      {cat:"Poursuite",titre:"Le Volcan",desc:"Au centre, un lanceur avec des balles de mousse. Les coureurs traversent sans se faire toucher.",duree:"10 min",materiel:"Balles de mousse",intensite:"Élevé"},
      {cat:"Poursuite",titre:"Pirates et Trésors",desc:"Les pirates protègent le trésor (sacs de fèves). Les autres tentent de le voler sans se faire toucher!",duree:"12 min",materiel:"Sacs de fèves, dossards",intensite:"Élevé"},
      {cat:"Poursuite",titre:"Chat Tortue",desc:"Pour se protéger du chat, se coucher sur le dos comme une tortue! Max 3 secondes.",duree:"8 min",materiel:"Aucun",intensite:"Élevé"},
      // -- Coopération --
      {cat:"Coopération",titre:"Le Naufrage",desc:"Toute l'équipe doit se tenir sur des tapis de plus en plus petits sans tomber.",duree:"10 min",materiel:"Tapis",intensite:"Faible"},
      {cat:"Coopération",titre:"La Chenille",desc:"En équipe, former une chenille (à quatre pattes en file). La chenille doit avancer ensemble!",duree:"8 min",materiel:"Aucun",intensite:"Moyen"},
      {cat:"Coopération",titre:"Construire la Tour",desc:"Empiler des blocs de mousse en équipe. La plus haute tour gagne!",duree:"12 min",materiel:"Blocs de mousse",intensite:"Faible"},
      {cat:"Coopération",titre:"Relais Obstacles",desc:"Parcours d'obstacles en relais: ramper, sauter, contourner les cônes.",duree:"15 min",materiel:"Cônes, cerceaux, bancs",intensite:"Élevé"},
      // -- Manipulation / Lancer --
      {cat:"Manipulation",titre:"Bombardement",desc:"2 équipes. Lancer le plus de balles dans le camp adverse en 2 min.",duree:"10 min",materiel:"Balles de mousse",intensite:"Élevé"},
      {cat:"Manipulation",titre:"Frisbee au Panier",desc:"Lancer des frisbees dans des cerceaux au sol. Points selon la distance.",duree:"12 min",materiel:"Frisbees, cerceaux",intensite:"Faible"},
      {cat:"Manipulation",titre:"Soccer Crabe",desc:"Jouer au soccer en position crabe (mains et pieds au sol, ventre vers le haut).",duree:"12 min",materiel:"Ballon mousse",intensite:"Élevé"},
      {cat:"Manipulation",titre:"Ballon Musical",desc:"En cercle, passer le ballon. Quand la musique arrête, celui qui a le ballon fait un défi!",duree:"10 min",materiel:"Ballon, musique",intensite:"Faible"},
      {cat:"Manipulation",titre:"La Chasse aux Œufs",desc:"Des balles cachées partout. En équipe, ramasser le maximum en 3 min!",duree:"10 min",materiel:"Petites balles",intensite:"Moyen"},
      {cat:"Manipulation",titre:"Drapeau",desc:"2 équipes. Aller chercher le drapeau dans le camp adverse sans se faire toucher!",duree:"15 min",materiel:"Foulards, cônes",intensite:"Élevé"}
    ]
  },

  // ===== 2E CYCLE (3e-4e année, 8-10 ans) =====
  cycle2: {
    label: "2e Cycle (3e-4e)",
    icon: "⚡",
    jeux: [
      // -- Ballon chasseur --
      {cat:"Ballon chasseur",titre:"Ballon Chasseur Classique",desc:"2 équipes. Éliminer les adversaires en les touchant avec un ballon de mousse. Attrapé = lanceur éliminé.",duree:"15 min",materiel:"Ballons mousse, dossards",intensite:"Élevé"},
      {cat:"Ballon chasseur",titre:"Ballon Chasseur Médecin",desc:"Un médecin secret par équipe. S'il touche un éliminé, celui-ci revient! Trouve le médecin!",duree:"15 min",materiel:"Ballons mousse",intensite:"Élevé"},
      {cat:"Ballon chasseur",titre:"Ballon Chasseur Roi/Reine",desc:"Chaque équipe a un roi secret. Si le roi est éliminé, toute l'équipe perd!",duree:"12 min",materiel:"Ballons mousse",intensite:"Élevé"},
      {cat:"Ballon chasseur",titre:"Ballon Chasseur 4 Coins",desc:"4 équipes dans 4 zones. Chaque équipe peut attaquer les 3 autres!",duree:"15 min",materiel:"Ballons mousse, cônes",intensite:"Élevé"},
      // -- Sports collectifs --
      {cat:"Sport collectif",titre:"Hockey Intérieur",desc:"Hockey avec bâtons de ringuette et balle. Petits buts. Pas de lever le bâton!",duree:"20 min",materiel:"Bâtons ringuette, balle",intensite:"Élevé"},
      {cat:"Sport collectif",titre:"Kickball",desc:"Comme le baseball mais on frappe le ballon avec le pied!",duree:"20 min",materiel:"Ballon, bases/cônes",intensite:"Élevé"},
      {cat:"Sport collectif",titre:"Ultimate Frisbee Simplifié",desc:"Passer le frisbee à ses coéquipiers. On ne peut pas courir avec. Marquer dans la zone de but.",duree:"15 min",materiel:"Frisbee, cônes",intensite:"Élevé"},
      {cat:"Sport collectif",titre:"Tchoukball Adapté",desc:"Lancer le ballon sur le cadre élastique. Si l'adversaire ne l'attrape pas = point!",duree:"15 min",materiel:"Cadre tchoukball, ballon",intensite:"Élevé"},
      // -- Coopération --
      {cat:"Coopération",titre:"Le Nœud Humain",desc:"En cercle, saisir les mains de personnes non voisines. Se démêler sans se lâcher!",duree:"10 min",materiel:"Aucun",intensite:"Faible"},
      {cat:"Coopération",titre:"La Traverse du Marais",desc:"Traverser le gymnase en équipe en utilisant seulement 3 tapis. Le sol est de la lave!",duree:"12 min",materiel:"Tapis",intensite:"Moyen"},
      {cat:"Coopération",titre:"Relais Défi",desc:"Relais avec défis variés: dribbler, sauter à la corde, lancer précision, slalom.",duree:"15 min",materiel:"Varié",intensite:"Élevé"},
      // -- Opposition --
      {cat:"Opposition",titre:"Lutte Sumo Cerceaux",desc:"2 joueurs dans un cerceau. Pousser l'autre hors du cerceau sans les mains!",duree:"10 min",materiel:"Cerceaux",intensite:"Moyen"},
      {cat:"Opposition",titre:"Queue du Dragon",desc:"2 équipes en file. La tête du dragon essaie d'attraper la queue de l'autre dragon.",duree:"10 min",materiel:"Foulards",intensite:"Élevé"},
      {cat:"Opposition",titre:"Tir à la Corde Humain",desc:"Classique tir à la corde. 2 équipes, une corde. Traverser la ligne = perdant!",duree:"8 min",materiel:"Corde",intensite:"Élevé"},
      {cat:"Opposition",titre:"Capture du Drapeau",desc:"2 équipes, chacune protège son drapeau. Aller capturer celui de l'autre sans se faire toucher!",duree:"20 min",materiel:"Drapeaux, dossards",intensite:"Élevé"},
      {cat:"Opposition",titre:"Ballon Chasseur Prison",desc:"Éliminé = prison derrière l'adversaire. Attraper un ballon depuis la prison = libéré!",duree:"15 min",materiel:"Ballons mousse",intensite:"Élevé"}
    ]
  },

  // ===== 3E CYCLE (5e-6e année, 10-12 ans) =====
  cycle3: {
    label: "3e Cycle (5e-6e)",
    icon: "🔥",
    jeux: [
      // -- Sports collectifs avancés --
      {cat:"Sport collectif",titre:"Basketball 3c3",desc:"Mini matchs de basketball 3 contre 3. Premier à 5 paniers.",duree:"15 min",materiel:"Ballons, paniers",intensite:"Élevé"},
      {cat:"Sport collectif",titre:"Volleyball Modifié",desc:"Le ballon peut rebondir 1 fois au sol. Rotation après chaque point.",duree:"15 min",materiel:"Filet, ballon mousse",intensite:"Moyen"},
      {cat:"Sport collectif",titre:"Handball Simplifié",desc:"Comme le soccer mais avec les mains. Dribbler, passer, lancer au but!",duree:"20 min",materiel:"Ballon handball, buts",intensite:"Élevé"},
      {cat:"Sport collectif",titre:"Flag Football",desc:"Football sans contact. Retirer le flag = arrêt du jeu. Passes avant et courses.",duree:"20 min",materiel:"Flags, ballon football",intensite:"Élevé"},
      {cat:"Sport collectif",titre:"Spikeball",desc:"2 c 2 autour d'un filet rond. Frapper le ballon sur le filet. 3 touches max par équipe.",duree:"12 min",materiel:"Filet spikeball, balle",intensite:"Moyen"},
      {cat:"Sport collectif",titre:"Ultimate Frisbee",desc:"2 équipes. Passes de frisbee pour atteindre la zone de but. Pas le droit de courir avec.",duree:"20 min",materiel:"Frisbee, cônes",intensite:"Élevé"},
      // -- Ballon chasseur avancé --
      {cat:"Ballon chasseur",titre:"Ballon Chasseur Vengeur",desc:"Quand tu es éliminé, tu retiens qui t'a éliminé. Si cette personne est éliminée, tu reviens!",duree:"15 min",materiel:"Ballons mousse",intensite:"Élevé"},
      {cat:"Ballon chasseur",titre:"Ballon Chasseur Bouclier",desc:"Chaque joueur a un tapis comme bouclier. Touché au tapis = ok, touché au corps = éliminé.",duree:"12 min",materiel:"Ballons mousse, tapis",intensite:"Élevé"},
      {cat:"Ballon chasseur",titre:"Ballon Chasseur Zombies",desc:"Les éliminés deviennent zombies qui marchent lentement et touchent pour éliminer aussi!",duree:"15 min",materiel:"Ballons mousse",intensite:"Élevé"},
      // -- Stratégie / Opposition --
      {cat:"Opposition",titre:"Roi de la Montagne",desc:"Rester sur le tapis surélevé le plus longtemps possible. Les autres essaient de prendre ta place!",duree:"10 min",materiel:"Gros tapis",intensite:"Élevé"},
      {cat:"Opposition",titre:"Bataille Navale Vivante",desc:"2 équipes. Placer ses bateaux (joueurs assis). Lancer des balles pour 'couler' les navires adverses.",duree:"15 min",materiel:"Balles, tapis",intensite:"Moyen"},
      {cat:"Opposition",titre:"Mission Impossible",desc:"Un gardien protège les trésors. Les espions doivent en voler le max sans se faire voir!",duree:"12 min",materiel:"Sacs de fèves",intensite:"Moyen"},
      // -- Coopération avancée --
      {cat:"Coopération",titre:"Course à Relais Folle",desc:"Relais avec défis loufoques: courir à reculons, skip, sauter en sac, porter un coéquipier.",duree:"15 min",materiel:"Sacs, cônes",intensite:"Élevé"},
      {cat:"Coopération",titre:"Gymkhana",desc:"Parcours chronométré avec 10 stations: corde à sauter, slalom, lancer, équilibre, etc.",duree:"20 min",materiel:"Varié",intensite:"Élevé"},
      {cat:"Coopération",titre:"Le Pont Humain",desc:"L'équipe doit traverser le gymnase. Seulement X pieds au sol pour toute l'équipe!",duree:"10 min",materiel:"Aucun",intensite:"Moyen"},
      {cat:"Coopération",titre:"Défi Ninja",desc:"En cercle. Chaque joueur fait un mouvement. Si on touche la main d'un adversaire, il est éliminé!",duree:"10 min",materiel:"Aucun",intensite:"Faible"}
    ]
  }
};
