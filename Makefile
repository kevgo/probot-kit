.DEFAULT_GOAL := build

# platform-specificity
ifdef ComSpec
	/ := $(strip \)
else
	/ := /
endif

build: clean  # builds the production version
	@node_modules$/.bin$/tsc -p .

clean:  # removes all build artifacts
	@rm -rf dist

doc:  # checks the documentation
	node_modules$/.bin$/text-run

help:   # prints all make targets
	@cat Makefile | grep '^[^ ]*:' | grep -v '.PHONY' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

lint:  # lints the code base
	node_modules$/.bin$/tsc --noEmit
	node_modules$/.bin$/tslint --project tsconfig.json
	node_modules$/.bin$/prettier -l '*.md'
	# node_modules$/.bin$/prettier -l '*.yml'
	node_modules$/.bin$/prettier -l '*.json'
	node_modules$/.bin$/prettier -l 'src/**'

spec: lint test doc    # runs all tests

test:   # runs the unit tests
	mocha
