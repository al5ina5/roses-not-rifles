module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [],
    theme: {
        extend: {
            maxHeight: {
                0: '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                full: '100%'
            },
            height: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%'
            }
        }
    },
    variants: {},
    plugins: []
}
