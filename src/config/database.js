module.exports = {
    storage: 'dev.sqlite',
    dialect: 'sqlite',
    database: 'banco',
    define: {
        timestamps: true,
        underscored: true
    },
    jwtSecret: "Nta$K-AP1",
    jwtSession:	{session:	false}
};