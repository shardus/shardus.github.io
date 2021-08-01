{
  const container = document.querySelector('.header-content .globe');
  const controller = new GIO.Controller(container);
  controller.configure({
    control: {
      halo: false,
    },
    color: {
      surface: 0xffffff,
      selected: '#000',
      in: 0x2188ff,
      out: 0x2188fff,
      background: null,
      halo: null,
    },
    brightness: {
      mentioned: 0,
      related: 0,
      ocean: 0,
    },
  });
  controller.setInitCountry('KM');
  controller.setTransparentBackground(true);
  controller.setAutoRotation(true, -0.5);
  controller.init();
}
