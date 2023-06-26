#OVERVIEW

hi, this is a basic react js app  that execute sql quries on large dataset mainly in lakhs it has a code editor,a run query button, a download button for the user to download the data,select query list that lets you select quries from it to execute


#FRAMEWORK USED

REACT JS + TAILWIND

#LIBRARIES USED 

@koale/useworker: for multi threading and execute long run task in background
react-codemirror : for codeeditor text area input
tailwind css: for css in app
react-hot-toast for toast message

#PAGE LOAD TIME 

1 millisecond is the page load time

#HOW I MEASURED PAGE LOAD TIME

i used performance.now in useeffect of app.js and in return when the component unmounts and calculated the difference


#HIGHLIGHTS
this app loads 500000 + customers dataset in around 100 milliseconds

