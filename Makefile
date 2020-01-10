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

docs:  # checks the documentation
	node_modules$/.bin$/text-run --format dot

fix:  # runs all automated code repair tools
	node_modules$/.bin$/tslint --project . --fix
	node_modules$/.bin$/prettier --write '*.md'
	node_modules$/.bin$/prettier --write '*.yml'
	node_modules$/.bin$/prettier --write '*.json'
	node_modules$/.bin$/prettier --write 'src/**'
	node_modules$/.bin$/prettier --write 'test/*.ts'
	node_modules$/.bin$/prettier --write 'text-run/**'

help:   # prints all make targets
	@cat Makefile | grep '^[^ ]*:' | grep -v '.PHONY' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

lint:  # lints the code base
	node_modules$/.bin$/tsc --noEmit
	node_modules$/.bin$/tslint --project tsconfig.json
	node_modules$/.bin$/prettier -l '*.md'
	node_modules$/.bin$/prettier -l '*.yml'
	node_modules$/.bin$/prettier -l '*.json'
	node_modules$/.bin$/prettier -l 'src/**'
	node_modules$/.bin$/prettier -l 'test/*.ts'
	node_modules$/.bin$/prettier -l 'text-run/**'

test:  # runs all tests
	@node_modules$/.bin$/tsc --noEmit &
	@node_modules$/.bin$/tslint --project tsconfig.json &
	@node_modules$/.bin$/prettier -l '*.md' &
	@node_modules$/.bin$/prettier -l '*.yml' &
	@node_modules$/.bin$/prettier -l '*.json' &
	@node_modules$/.bin$/prettier -l 'src/**' &
	@node_modules$/.bin$/prettier -l 'test/*.ts' &
	@node_modules$/.bin$/prettier -l 'text-run/**' &
	@node_modules$/.bin$/text-run --format dot &
	@node_modules$/.bin$/mocha

unit:   # runs the unit tests
	node_modules$/.bin$/mocha
.PHONY: test
