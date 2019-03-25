/*eslint no-unused-vars: "warn"*/

const { RESOURCES } = require('@asymmetrik/node-fhir-server-core').constants;
const FHIRServer = require('@asymmetrik/node-fhir-server-core');
const { ObjectID } = require('mongodb');
const moment = require('moment-timezone');
const { getUuid } = require('../../utils/uid.util');
const { COLLECTION, CLIENT_DB } = require('../../constants');
const globals = require('../../globals');

let getClinicalImpression = (base_version) => {
	return require(FHIRServer.resolveFromVersion(base_version, RESOURCES.CLINICALIMPRESSION));};

let getMeta = (base_version) => {
	return require(FHIRServer.resolveFromVersion(base_version, RESOURCES.META));};

module.exports.search = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('ClinicalImpression >>> search');

	// Common search params
	let { base_version, _content, _format, _id, _lastUpdated, _profile, _query, _security, _tag } = args;

	// Search Result params
	let { _INCLUDE, _REVINCLUDE, _SORT, _COUNT, _SUMMARY, _ELEMENTS, _CONTAINED, _CONTAINEDTYPED } = args;

	// Resource Specific params
	let action = args['action'];
	let assessor = args['assessor'];
	let _context = args['_context'];
	let date = args['date'];
	let finding_code = args['finding-code'];
	let finding_ref = args['finding-ref'];
	let identifier = args['identifier'];
	let investigation = args['investigation'];
	let patient = args['patient'];
	let previous = args['previous'];
	let problem = args['problem'];
	let status = args['status'];
	let subject = args['subject'];

	// TODO: Build query from Parameters

	// TODO: Query database

	let ClinicalImpression = getClinicalImpression(base_version);

	// Cast all results to ClinicalImpression Class
	let clinicalimpression_resource = new ClinicalImpression();
	// TODO: Set data with constructor or setter methods
	clinicalimpression_resource.id = 'test id';

	// Return Array
	resolve([clinicalimpression_resource]);
});

module.exports.searchById = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('ClinicalImpression >>> searchById');

	let { base_version, id } = args;

	let ClinicalImpression = getClinicalImpression(base_version);

	// TODO: Build query from Parameters

	// TODO: Query database

	// Cast result to ClinicalImpression Class
	let clinicalimpression_resource = new ClinicalImpression();
	// TODO: Set data with constructor or setter methods
	clinicalimpression_resource.id = 'test id';

	// Return resource class
	// resolve(clinicalimpression_resource);
	resolve();
});

module.exports.create = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('ClinicalImpression >>> create');

	let { base_version, resource } = args;
	// Make sure to use this ID when inserting this resource
	let id = new ObjectID().toString();

	let ClinicalImpression = getClinicalImpression(base_version);
	let Meta = getMeta(base_version);

	// TODO: determine if client/server sets ID

	// Cast resource to ClinicalImpression Class
	let clinicalimpression_resource = new ClinicalImpression(resource);
	clinicalimpression_resource.meta = new Meta({versionId: '1', lastUpdated: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ')});
	// TODO: set meta info

	// TODO: save record to database
    id = resource.id;
	if (id === undefined) {
		id = getUuid(clinicalimpression_resource);
	}
    
	let db = globals.get(CLIENT_DB);
	let collection = db.collection(`${COLLECTION.CLINICALIMPRESSION}_${base_version}`);
	let doc = JSON.parse(JSON.stringify(clinicalimpression_resource.toJSON()));
	Object.assign(doc, {id: id});
	let history_doc = Object.assign({}, doc);
	Object.assign(doc, {_id: id});
	// Insert our Clinical Impression record:
	collection.insertOne(doc, (err) => {
		if (err) {
			logger.error('Error with ClinicalImpression.create: ', err);
			return reject(err);
		}

		//Save the resource to history
		let history_collection = db.collection(`${COLLECTION.CLINICALIMPRESSION}_${base_version}_History`);

		//Insert our observation record to history but don't assign _id.
		return history_collection.insertOne(history_doc, (err2) => {
			if (err2) {
				logger.error('Error with ClinicalImpressionHisotry.create', err2);
				return reject(err2);
			}
			return resolve({id: doc.id, resource_version: doc.meta.versionId});
		});
	});

	// Return Id
	resolve({ id });
});

module.exports.update = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('ClinicalImpression >>> update');

	let { base_version, id, resource } = args;

	let ClinicalImpression = getClinicalImpression(base_version);
	let Meta = getMeta(base_version);

	// Cast resource to ClinicalImpression Class
	let clinicalimpression_resource = new ClinicalImpression(resource);
	clinicalimpression_resource.meta = new Meta();
	// TODO: set meta info, increment meta ID

	// TODO: save record to database

	// Return id, if recorded was created or updated, new meta version id
	resolve({ id: clinicalimpression_resource.id, created: false, resource_version: clinicalimpression_resource.meta.versionId });
});

module.exports.remove = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('ClinicalImpression >>> remove');

	let { id } = args;

	// TODO: delete record in database (soft/hard)

	// Return number of records deleted
	resolve({ deleted: 0 });
});

module.exports.searchByVersionId = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('ClinicalImpression >>> searchByVersionId');

	let { base_version, id, version_id } = args;

	let ClinicalImpression = getClinicalImpression(base_version);

	// TODO: Build query from Parameters

	// TODO: Query database

	// Cast result to ClinicalImpression Class
	let clinicalimpression_resource = new ClinicalImpression();

	// Return resource class
	resolve(clinicalimpression_resource);
});

module.exports.history = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('ClinicalImpression >>> history');

	// Common search params
	let { base_version, _content, _format, _id, _lastUpdated, _profile, _query, _security, _tag } = args;

	// Search Result params
	let { _INCLUDE, _REVINCLUDE, _SORT, _COUNT, _SUMMARY, _ELEMENTS, _CONTAINED, _CONTAINEDTYPED } = args;

	// Resource Specific params
	let action = args['action'];
	let assessor = args['assessor'];
	let _context = args['_context'];
	let date = args['date'];
	let finding_code = args['finding-code'];
	let finding_ref = args['finding-ref'];
	let identifier = args['identifier'];
	let investigation = args['investigation'];
	let patient = args['patient'];
	let previous = args['previous'];
	let problem = args['problem'];
	let status = args['status'];
	let subject = args['subject'];

	// TODO: Build query from Parameters

	// TODO: Query database

	let ClinicalImpression = getClinicalImpression(base_version);

	// Cast all results to ClinicalImpression Class
	let clinicalimpression_resource = new ClinicalImpression();

	// Return Array
	resolve([clinicalimpression_resource]);
});

module.exports.historyById = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('ClinicalImpression >>> historyById');

	// Common search params
	let { base_version, _content, _format, _id, _lastUpdated, _profile, _query, _security, _tag } = args;

	// Search Result params
	let { _INCLUDE, _REVINCLUDE, _SORT, _COUNT, _SUMMARY, _ELEMENTS, _CONTAINED, _CONTAINEDTYPED } = args;

	// Resource Specific params
	let action = args['action'];
	let assessor = args['assessor'];
	let _context = args['_context'];
	let date = args['date'];
	let finding_code = args['finding-code'];
	let finding_ref = args['finding-ref'];
	let identifier = args['identifier'];
	let investigation = args['investigation'];
	let patient = args['patient'];
	let previous = args['previous'];
	let problem = args['problem'];
	let status = args['status'];
	let subject = args['subject'];

	// TODO: Build query from Parameters

	// TODO: Query database

	let ClinicalImpression = getClinicalImpression(base_version);

	// Cast all results to ClinicalImpression Class
	let clinicalimpression_resource = new ClinicalImpression();

	// Return Array
	resolve([clinicalimpression_resource]);
});
