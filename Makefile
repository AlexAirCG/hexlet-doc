.PHONY: test

test:
	NODE_OPTIONS=--experimental-vm-modules FUNCTION_VERSION=right1 npx jest --env=node $(file)
