import { DataTypes } from 'sequelize'

const Posts = (sequelize) => {
    const Schema = {
        photo: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        caption: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        }
        
    }

    return sequelize.define('posts', Schema)
}

export default Posts