onmessage = (e) => {
  console.log(e.data);
  Jmol.script(myJmol, 'set antialiasDisplay true;axes 2;axes MOLECULAR;zoom 150');
};
