/*eslint no-unused-vars: "warn"*/

const { RESOURCES } = require('@asymmetrik/node-fhir-server-core').constants;
const FHIRServer = require('@asymmetrik/node-fhir-server-core');
const { ObjectID } = require('mongodb');
const moment = require('moment-timezone');
const { getUuid } = require('../../utils/uid.util');
const { COLLECTION, CLIENT_DB } = require('../../constants');
const globals = require('../../globals');

let getPractitioner = (base_version) => {
	return require(FHIRServer.resolveFromVersion(base_version, RESOURCES.PRACTITIONER));};

let getMeta = (base_version) => {
	return require(FHIRServer.resolveFromVersion(base_version, RESOURCES.META));};

module.exports.search = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('Practitioner >>> search');

	// Common search params
	let { base_version, _content, _format, _id, _lastUpdated, _profile, _query, _security, _tag } = args;

	// Search Result params
	let { _INCLUDE, _REVINCLUDE, _SORT, _COUNT, _SUMMARY, _ELEMENTS, _CONTAINED, _CONTAINEDTYPED } = args;

	// Resource Specific params
	let active = args['active'];
	let address = args['address'];
	let address_city = args['address-city'];
	let address_country = args['address-country'];
	let address_postalcode = args['address-postalcode'];
	let address_state = args['address-state'];
	let address_use = args['address-use'];
	let communication = args['communication'];
	let email = args['email'];
	let family = args['family'];
	let gender = args['gender'];
	let given = args['given'];
	let identifier = args['identifier'];
	let name = args['name'];
	let phone = args['phone'];
	let phonetic = args['phonetic'];
	let telecom = args['telecom'];

	// TODO: Build query from Parameters

	// TODO: Query database

	let Practitioner = getPractitioner(base_version);

	// Cast all results to Practitioner Class
	let practitioner_resource = new Practitioner();
	// TODO: Set data with constructor or setter methods
	practitioner_resource.id = 'test id';

	// Return Array
	resolve([practitioner_resource]);
});

module.exports.searchById = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('Practitioner >>> searchById');

	let { base_version, id } = args;

	let Practitioner = getPractitioner(base_version);

	// TODO: Build query from Parameters

	// TODO: Query database

	// Cast result to Practitioner Class
	let practitioner_resource = new Practitioner();
	// TODO: Set data with constructor or setter methods
	practitioner_resource.id = 'test id';

	// Return resource class
	// resolve(practitioner_resource);
	resolve();
});

module.exports.create = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('Practitioner >>> create');

	let { base_version, resource } = args;
	// Make sure to use this ID when inserting this resource
	let id = new ObjectID().toString();

	let Practitioner = getPractitioner(base_version);
	let Meta = getMeta(base_version);
    
	// TODO: determine if client/server sets ID

	// Cast resource to Practitioner Class
	let practitioner_resource = new Practitioner(resource);
	practitioner_resource.meta = new Meta({versionId: '1', lastUpdated: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ')});
	// TODO: set meta info
    
    id = resource.id;
	if (id === undefined) {
		id = getUuid(practitioner_resource);
	}

	let db = globals.get(CLIENT_DB);
	let collection = db.collection(`${COLLECTION.PRACTITIONER}_${base_version}`);
	let doc = JSON.parse(JSON.stringify(practitioner_resource.toJSON()));
	Object.assign(doc, {id: id});
	let history_doc = Object.assign({}, doc);
	Object.assign(doc, {_id: id});
	// Insert our observation record:
	collection.insertOne(doc, (err) => {
		if (err) {
			logger.error('Error with Practitioner.create: ', err);
			return reject(err);
		}

		//Save the resource to history
		let history_collection = db.collection(`${COLLECTION.PRACTITIONER}_${base_version}_History`);

		//Insert our observation record to history but don't assign _id.
		return history_collection.insertOne(history_doc, (err2) => {
			if (err2) {
				logger.error('Error with ObservationHisotry.create', err2);
				return reject(err2);
			}
			return resolve({id: doc.id, resource_version: doc.meta.versionId});
		});
	});

	// TODO: save record to database

	// Return Id
	resolve({ id });
});

module.exports.update = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('Practitioner >>> update');

	let { base_version, id, resource } = args;

	let Practitioner = getPractitioner(base_version);
	let Meta = getMeta(base_version);

	// Cast resource to Practitioner Class
	let practitioner_resource = new Practitioner(resource);
	practitioner_resource.meta = new Meta();
	// TODO: set meta info, increment meta ID

	// TODO: save record to database

	// Return id, if recorded was created or updated, new meta version id
	resolve({ id: practitioner_resource.id, created: false, resource_version: practitioner_resource.meta.versionId });
});

module.exports.remove = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('Practitioner >>> remove');

	let { id } = args;

	// TODO: delete record in database (soft/hard)

	// Return number of records deleted
	resolve({ deleted: 0 });
});

module.exports.searchByVersionId = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('Practitioner >>> searchByVersionId');

	let { base_version, id, version_id } = args;

	let Practitioner = getPractitioner(base_version);

	// TODO: Build query from Parameters

	// TODO: Query database

	// Cast result to Practitioner Class
	let practitioner_resource = new Practitioner();

	// Return resource class
	resolve(practitioner_resource);
});

module.exports.history = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('Practitioner >>> history');

	// Common search params
	let { base_version, _content, _format, _id, _lastUpdated, _profile, _query, _security, _tag } = args;

	// Search Result params
	let { _INCLUDE, _REVINCLUDE, _SORT, _COUNT, _SUMMARY, _ELEMENTS, _CONTAINED, _CONTAINEDTYPED } = args;

	// Resource Specific params
	let active = args['active'];
	let address = args['address'];
	let address_city = args['address-city'];
	let address_country = args['address-country'];
	let address_postalcode = args['address-postalcode'];
	let address_state = args['address-state'];
	let address_use = args['address-use'];
	let communication = args['communication'];
	let email = args['email'];
	let family = args['family'];
	let gender = args['gender'];
	let given = args['given'];
	let identifier = args['identifier'];
	let name = args['name'];
	let phone = args['phone'];
	let phonetic = args['phonetic'];
	let telecom = args['telecom'];

	// TODO: Build query from Parameters

	// TODO: Query database

	let Practitioner = getPractitioner(base_version);

	// Cast all results to Practitioner Class
	let practitioner_resource = new Practitioner();

	// Return Array
	resolve([practitioner_resource]);
});

module.exports.historyById = (args, context, logger) => new Promise((resolve, reject) => {
	logger.info('Practitioner >>> historyById');

	// Common search params
	let { base_version, _content, _format, _id, _lastUpdated, _profile, _query, _security, _tag } = args;

	// Search Result params
	let { _INCLUDE, _REVINCLUDE, _SORT, _COUNT, _SUMMARY, _ELEMENTS, _CONTAINED, _CONTAINEDTYPED } = args;

	// Resource Specific params
	let active = args['active'];
	let address = args['address'];
	let address_city = args['address-city'];
	let address_country = args['address-country'];
	let address_postalcode = args['address-postalcode'];
	let address_state = args['address-state'];
	let address_use = args['address-use'];
	let communication = args['communication'];
	let email = args['email'];
	let family = args['family'];
	let gender = args['gender'];
	let given = args['given'];
	let identifier = args['identifier'];
	let name = args['name'];
	let phone = args['phone'];
	let phonetic = args['phonetic'];
	let telecom = args['telecom'];

	// TODO: Build query from Parameters

	// TODO: Query database

	let Practitioner = getPractitioner(base_version);

	// Cast all results to Practitioner Class
	let practitioner_resource = new Practitioner();

	// Return Array
	resolve([practitioner_resource]);
});
