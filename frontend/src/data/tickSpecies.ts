export interface TickSpeciesInfo {
  commonName: string;
  latinName: string;
  description: string;
  habitat: string;
  identification: string;
  hosts: string;
  publicHealth: string;
}

export const tickSpecies: Record<string, TickSpeciesInfo> = {
  "ixodes ricinus": {
    commonName: "Sheep tick / Deer tick",
    latinName: "Ixodes ricinus",

    description:
      "The most common and widespread tick species found in the UK.",

    habitat:
      "Commonly found in woodland, rough grassland, moorland, heathland and some urban parks. It favours areas with moist vegetation and leaf litter.",

    identification:
      "Usually reddish-brown. Adult females have a distinctive dark shield near the head, while their bodies can become grey and swollen after feeding.",

    hosts:
      "Feeds on a variety of mammals, birds and reptiles. Hosts include deer, sheep, dogs and humans.",

    publicHealth:
      "Can transmit Lyme disease and other infections. Its presence does not mean that a particular tick carries an infection.",
  },
  "ixodes acuminatus": {
    commonName: "Southern rodent tick",
    latinName: "Ixodes acuminatus",
    description:
      "A relatively uncommon UK tick associated mainly with small mammals.",
    habitat:
      "Typically found in the burrows and nests of its hosts, particularly in lowland coastal areas of southern England.",
    identification:
      "A small hard tick. Accurate identification should be made using specialist morphological features.",
    hosts:
      "Primarily small rodents. It has also been recorded on other mammals, including foxes and badgers.",
    publicHealth:
      "Human bites are reported as rare. Its presence alone does not indicate that it carries an infection.",
  },

  "ixodes apronophorus": {
    commonName: "Marsh tick",
    latinName: "Ixodes apronophorus",
    description:
      "A specialist tick associated with wetland environments and small mammals.",
    habitat:
      "Found around marshes, reedbeds, lakesides and riverbanks. UK records include parts of East Anglia.",
    identification:
      "A small hard tick. Specialist examination is needed for reliable identification.",
    hosts:
      "Water voles, bank voles and field voles.",
    publicHealth:
      "Primarily associated with wildlife. Do not assume that a sighting represents a risk to people.",
  },

  "ixodes arboricola": {
    commonName: "Tree-hole tick",
    latinName: "Ixodes arboricola",
    description:
      "A bird-associated tick that lives around nesting sites, particularly holes in trees.",
    habitat:
      "Found in tree holes, bird nests and occasionally cave entrances.",
    identification:
      "A small hard tick. Identification requires examination of specialist physical features.",
    hosts:
      "Mainly hole-nesting birds, including blue tits and great tits. Other birds have also been recorded.",
    publicHealth:
      "Primarily a parasite of birds. Its presence should not be interpreted as evidence of human disease risk.",
  },

  "ixodes canisuga": {
    commonName: "Fox/badger tick",
    latinName: "Ixodes canisuga",
    description:
      "A UK tick associated with foxes, badgers and domestic dogs.",
    habitat:
      "Often found around animal dens, resting places and other sheltered nesting environments.",
    identification:
      "A small hard tick. Specialist examination is needed to distinguish it reliably from similar species.",
    hosts:
      "Commonly found on badgers, foxes and domestic dogs.",
    publicHealth:
      "Can occasionally be encountered on companion animals. A tick's presence does not establish that it carries an infection.",
  },

  "dermacentor frontalis": {
    commonName: "Passerine tick",
    latinName: "Dermacentor frontalis",
    description:
      "NOTICE: there is no recognised tick species under this latin name.",
    habitat:
      "TBC",
    identification:
      "TBC",
    hosts:
      "The passerine tick, Ixodes frontalis, is associated with birds.",
    publicHealth:
      "TBC",
  },
  "ixodes frontalis": {
    commonName: "Passerine tick",
    latinName: "Ixodes frontalis",
    description:
      "A bird-associated tick found in the UK, particularly on passerine birds.",
    habitat:
      "Often associated with bird nesting sites and places where ground-feeding birds gather.",
    identification:
      "A specialist tick identification is needed for reliable confirmation.",
    hosts:
      "Primarily birds, especially passerines. It can occasionally be found feeding on humans.",
    publicHealth:
      "It is primarily a bird parasite. Its presence should not be taken as evidence of human infection risk.",
  }
};

//this maps the dermacentor name to ixodes
export const tickSpeciesAliases: Record<string, string> = {
  "dermacentor frontalis": "ixodes frontalis",
};