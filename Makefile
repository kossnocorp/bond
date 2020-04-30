.DEFAULT_GOAL := build
.PHONY: build

BIN = $(shell yarn bin)

test: test-node test-browser
.PHONY: test

test-node:
	${BIN}/jest --env node

test-node-watch:
	${BIN}/jest --env node --watch

test-browser:
	${BIN}/karma start --single-run

test-browser-watch:
	${BIN}/karma start

build:
	@rm -rf lib
	@${BIN}/tsc
	@${BIN}/prettier "lib/**/*.[jt]s" --write --loglevel silent
	@cp {package.json,*.md} lib
	@rsync --archive --prune-empty-dirs --exclude '*.ts' --relative src/./ lib
	@${BIN}/tsc --outDir lib/esm --module es2020 --target es2019

publish: build
	cd lib && npm publish --access public

publish-next: build
	cd lib && npm publish --access public --tag next

docs:
	@${BIN}/typedoc --theme minimal --name Bond
.PHONY: docs