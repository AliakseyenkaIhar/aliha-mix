class Aliha {

	constructor(config) {

		this.config = config || {};

		this.entries = {};

		// Output folder inside theme
		this.output = 'public';

	}

	addEntry(from, name) {

		if(!(name in this.entries)) {

			// entry doesn't exists
			this.entries[name] = from;
		} else {
			this.entries[name].push(from);
		}

		return this;

	}

	// Do I need this method?
	set outputPath(path) {
		this.output = path;
	}

	get outputPath() {
		return this.output;
	}

	getEntries() {
		return this.entries;
	}

}

module.exports = Aliha;
