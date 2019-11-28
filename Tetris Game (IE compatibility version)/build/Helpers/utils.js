'use strict';

var Utils = {
    mixin: function mixin(receiver, supplier) {
        Object.getOwnPropertyNames(supplier).filter(function (property) {
            return property !== 'constructor';
        }).forEach(function (property) {
            var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
            Object.defineProperty(receiver, property, descriptor);
        });

        return receiver;
    }
};