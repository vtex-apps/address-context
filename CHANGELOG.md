# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Typing for `brief` display field.

## [0.5.0] - 2020-11-17
### Added
- Utility function `createEmptyAddress`.

### Changed
- Allow `null` to be passed as `address` in `AddressContextProvider`.

## [0.4.0] - 2020-10-30
### Added
- Validation by `pattern` field of `AddressField` schema.

## [0.3.0] - 2020-07-15
### Added
- `Utils` export that provides a `validateAddress` function.

## [0.2.0] - 2020-07-10
### Added
- Property `invalidFields` to the address context value.

## [0.1.0] - 2020-06-30
### Added
- Prop `rules` to `AddressContextProvider`.
- Property `isValid` to the address context value.

## [0.0.4] - 2020-03-12
### Fixed
- Type of `setAddress` function to allow function.

## [0.0.3] - 2020-03-10
### Changed
- Fixed internal typings and repository cleanup.

## [0.0.2] - 2020-01-23
### Added
- First working version of orchestrator, providing `address`, `setAddress`, and countries.

## [0.0.1] - 2019-09-23
### Added
- Test example for VTEX IO app.

## Changed
- Removed `injectIntl` from example
- **Component** Create the VTEX Store Component _IO Base App_
