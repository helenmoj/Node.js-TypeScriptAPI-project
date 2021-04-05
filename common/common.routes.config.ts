import express from 'express';
export abstract class CommonRoutesConfig { // keyword abstract to our class line, to enable abstraction for this class
    app: express.Application;
    name: string;
    
    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes(); // A call to this at the end of the constructor, since we can now be sure that this function will exist
    }
    getName() {
        return this.name;
    }
    abstract configureRoutes(): express.Application; // A new function declaration at the end of our class. 
}