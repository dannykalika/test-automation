import 'dotenv/config';
import { mainConfig } from '../../main.wdio.conf.mjs';

export const config = {
    ...mainConfig,
    runner: 'local',
    specs: ['./specs/**/*-spec.js'],
};
