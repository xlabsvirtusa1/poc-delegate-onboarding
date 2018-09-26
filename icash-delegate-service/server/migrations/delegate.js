'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('delegates', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              },

            username: {
                type: Sequelize.STRING(42)
            },
            password: {
                type: Sequelize.STRING(100)
            },
            delegate_address: {
                type: Sequelize.STRING(42)
            },

            first_name: {
                type: Sequelize.STRING(42)
            },
            last_name: {
                type: Sequelize.STRING(42)
            },

            email: {
                type: Sequelize.STRING(42)
            },

            dob: {
                type: Sequelize.DATE
            },
            kyc_reference_id: {
                type: Sequelize.STRING(42)
            },
            kyc_provider: {
                type: Sequelize.STRING(42)
            },
            screen_name: {
                type: Sequelize.STRING(42)
            },
            expertise: {
                type: Sequelize.ENUM('technology', 'science', 'movies', 'music', 'health', 'food', 'history', 'cooking', 'sports', 'politics')
            },
            delegate_type: {
                type: Sequelize.ENUM('superdelegate', 'delegate')
            },

            availability: {
                type: Sequelize.ENUM('BST', 'EDT', 'EST', 'GMT', 'IST', 'ACDT')
            },
            stake: {
                type: Sequelize.STRING(50)
            },
            wallet_address: {
                type: Sequelize.STRING(42)
            },
            delegate_state: {
                type: Sequelize.STRING(50)
            },

            delegate_state_change: {
                type: Sequelize.STRING(50)
            },
            adjudicate_categories: {
                type: Sequelize.STRING(50)
            },
            reserved_expertise: {
                type: Sequelize.STRING(50)
            },
            reserved_categories: {
                type: Sequelize.STRING(50)
            },
            primary_country: {
                type: Sequelize.STRING(50)
            },
            date_range: {
                type: Sequelize.STRING(50)
            },
            timescale: {
                type: Sequelize.STRING(50)
            },
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('delegates');
    }
};