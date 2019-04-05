export class ConfigurationObject {
    architecture: string;
    version: string;
    name: string;
    type: string;
    environment: string;
    build: object;
    dependencies: object;
    init: object;
    run: object;
    includes: object;
    constructor(object: any) {
        this.architecture = object.architecture;
        this.name = object.name;
        this.type = object.type;
        this.environment = object.environment;
        this.build = object.build;
        this.dependencies = object.dependencies;
        this.init = object.init;
        this.run = object.run;
        this.version = object.verison;
        this.includes = object.includes;
    }
}
