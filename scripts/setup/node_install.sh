#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash


export NVM_DIR=/home/mderoir/.nvm
[ -s /home/mderoir/.nvm/nvm.sh ] && \. /home/mderoir/.nvm/nvm.sh  # This loads nvm
[ -s /home/mderoir/.nvm/bash_completion ] && \. /home/mderoir/.nvm/bash_completion  # This loads nvm bash_completion

nvm install v20.11.0
