//npm install better-sqlite3
//npm install slugify xss = > URL-friendly한 슬러그(slug)를 생성, xss방지

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

import fs from 'node:fs';
import { table } from 'node:console';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
    // get() => single row, ? => sql 인젝션 방지
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`); //서버 환경에서는 .next에 저장됨 수정필요
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            throw new Error('Saving image failed!');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals (
            title, 
            summary, 
            instructions, 
            creator, 
            creator_email, 
            image, 
            slug
        ) VALUES  (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}