sail := vendor/bin/sail
phpstan := vendor/bin/phpstan

.PHONY: rm
rm:
	$(sail) down -v

.PHONY: docker-setup
docker-setup:
	$(sail) build
	$(sail) up -d

.PHONY: backend-install
backend-install:
	$(sail) composer i

.PHONY: backend-setup
backend-setup:
	make backend-install
	$(sail) artisan key:generate

.PHONY: backend-migrate
backend-migrate:
	$(sail) artisan migrate --seed

.PHONY: frontend-clean
frontend-clean:
	rm -rf node_modules 2>/dev/null || true
	rm package-lock.json 2>/dev/null || true
	$(sail) yarn cache clean

.PHONY: frontend-install
frontend-install:
	make frontend-clean
	$(sail) npm install
	$(sail) npm run dev

.PHONY: build
build:
	make docker-setup
	make backend-setup
	make frontend-install

.PHONY: dev
dev:
	$(sail) up -d
	$(sail) npm run dev

.PHONY: pint
pint:
	$(sail) pint

.PHONY: lint
lint:
	$(phpstan) analyse

.PHONY: qa
qa:
	make pint
	make lint

.PHONY: generate_ide_helper
generate_ide_helper:
		$(sail) artisan ide-helper:generate
		$(sail) artisan ide-helper:models
		$(sail) artisan ide-helper:meta

