/* eslint-disable */
// Must import this into every Suite for the test to run
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
Enzyme.configure({ adapter: new Adapter() });
