import Model from './model.js';

export default class maths extends Model {
    constructor() {
        super();

        this.addField('op', 'string');
        this.addField('n', 'string');
        this.addField('x', 'string');
        this.addField('y', 'string');
        this.addField('value', 'string');
              
        this.setKey("Title");
    }
}